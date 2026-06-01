import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { AsyncResponse, AsyncValidatorConfig } from '../types/async-validator-config.type';
import { primitive } from '../utils/validators.utils';

type Resolver = (response: AsyncResponse) => boolean | null;

const _isEmpty = (value: unknown): boolean => value === null || value === undefined || value === '';

const _isSuccess = (response: AsyncResponse): boolean => response.status >= 200 && response.status < 300;

/** Default rule for existence checks: 2xx means the value exists, 404 means it does not. */
const _existsResolve: Resolver = (response: AsyncResponse): boolean | null => {
    if (_isSuccess(response)) {
        return true;
    }
    if (response.status === 404) {
        return false;
    }
    return null;
};

/** Default rule for uniqueness checks: 2xx means taken (invalid), 404 means free (valid). */
const _uniqueResolve: Resolver = (response: AsyncResponse): boolean | null => {
    if (_isSuccess(response)) {
        return false;
    }
    if (response.status === 404) {
        return true;
    }
    return null;
};

/** Default rule for remote validation: 2xx is valid, a 4xx is invalid, anything else undecided. */
const _remoteResolve: Resolver = (response: AsyncResponse): boolean | null => {
    if (_isSuccess(response)) {
        return true;
    }
    if (response.status >= 400 && response.status < 500) {
        return false;
    }
    return null;
};

const _request = (
    http: HttpClient,
    config: AsyncValidatorConfig,
    value: unknown,
    extraParams: Record<string, primitive>
): Observable<AsyncResponse> => {
    const method = config.method ?? 'GET';
    const paramName = config.paramName ?? 'value';
    const payload: Record<string, unknown> = { [paramName]: value, ...extraParams };

    let request$: Observable<HttpResponse<unknown>>;
    if (method === 'GET') {
        const params: Record<string, string> = {};
        Object.keys(payload).forEach(key => {
            params[key] = String(payload[key]);
        });
        request$ = http.get<unknown>(config.endpoint, { observe: 'response', params });
    } else {
        request$ = http.request<unknown>(method, config.endpoint, { body: payload, observe: 'response' });
    }

    // Turn HTTP errors (404, 409, 422, 5xx, network) into values so the resolver can inspect them.
    return request$.pipe(catchError((error: HttpErrorResponse) => of(error)));
};

const _check = (
    config: AsyncValidatorConfig,
    errorKey: string,
    defaultResolve: Resolver,
    extraParams: Record<string, primitive> = {}
): AsyncValidatorFn => {
    const http = inject(HttpClient);
    const debounceMs = config.debounceTime ?? 300;
    const resolve = config.resolve ?? defaultResolve;

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (_isEmpty(control.value)) {
            return of(null);
        }

        return timer(debounceMs).pipe(
            switchMap(() => _request(http, config, control.value, extraParams)),
            map(response => (resolve(response) === false ? { [errorKey]: true } : null)),
            first()
        );
    };
};

export namespace AsyncValidators {
    /**
     * The value must already exist in the backend. By default a `2xx` response means it exists
     * (valid) and a `404` means it does not (invalid); any other outcome is left undecided. Pass
     * `config.resolve` to define your own rule from the full response. Must be created in an
     * injection context (it injects `HttpClient`).
     *
     * ```
     * sku: new FormControl('', { asyncValidators: [
     *   NguardValidators.Async.exists({ endpoint: '/api/products/exists' })
     * ] })
     * ```
     *
     * @param {AsyncValidatorConfig} config Endpoint, request and resolve configuration
     * @returns {AsyncValidatorFn}
     */
    export const exists = (config: AsyncValidatorConfig): AsyncValidatorFn => _check(config, 'exists', _existsResolve);

    /**
     * Generic remote validation: the endpoint decides validity. By default a `2xx` response is
     * valid and a `4xx` is invalid; any other outcome is left undecided. Pass `config.resolve` to
     * define your own rule. Must be created in an injection context.
     *
     * ```
     * coupon: new FormControl('', { asyncValidators: [
     *   NguardValidators.Async.remoteValidation({ endpoint: '/api/coupons/validate' })
     * ] })
     * ```
     *
     * @param {AsyncValidatorConfig} config Endpoint, request and resolve configuration
     * @returns {AsyncValidatorFn}
     */
    export const remoteValidation = (config: AsyncValidatorConfig): AsyncValidatorFn =>
        _check(config, 'remoteValidation', _remoteResolve);

    /**
     * The value must be unique in the backend. By default a `2xx` response means it is already
     * taken (invalid) and a `404` means it is free (valid); any other outcome is left undecided.
     * Pass `config.resolve` to define your own rule. Must be created in an injection context.
     *
     * ```
     * username: new FormControl('', { asyncValidators: [
     *   NguardValidators.Async.unique({ endpoint: '/api/users/check-username' })
     * ] })
     * ```
     *
     * @param {AsyncValidatorConfig} config Endpoint, request and resolve configuration
     * @returns {AsyncValidatorFn}
     */
    export const unique = (config: AsyncValidatorConfig): AsyncValidatorFn => _check(config, 'unique', _uniqueResolve);

    /**
     * Like {@link unique} but ignores a specific record — useful on edit forms where the current
     * record legitimately owns the value. The `exceptId` is sent alongside the value (param
     * `except`). Reports the `unique` error key. Must be created in an injection context.
     *
     * ```
     * email: new FormControl('', { asyncValidators: [
     *   NguardValidators.Async.uniqueExcept(user.id, { endpoint: '/api/users/check-email' })
     * ] })
     * ```
     *
     * @param {primitive} exceptId The id of the record to exclude from the uniqueness check
     * @param {AsyncValidatorConfig} config Endpoint, request and resolve configuration
     * @returns {AsyncValidatorFn}
     */
    export const uniqueExcept = (exceptId: primitive, config: AsyncValidatorConfig): AsyncValidatorFn =>
        _check(config, 'unique', _uniqueResolve, { except: exceptId });
}
