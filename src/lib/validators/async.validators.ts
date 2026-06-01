import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { AsyncValidatorConfig } from '../types/async-validator-config.type';
import { primitive } from '../utils/validators.utils';

const _isEmpty = (value: unknown): boolean => value === null || value === undefined || value === '';

const _interpret = (config: AsyncValidatorConfig, response: unknown): boolean => {
    if (config.interpret) {
        return config.interpret(response);
    }
    if (response !== null && typeof response === 'object') {
        const obj = response as Record<string, unknown>;
        if ('exists' in obj) {
            return Boolean(obj['exists']);
        }
        if ('valid' in obj) {
            return Boolean(obj['valid']);
        }
    }
    return Boolean(response);
};

const _request = (
    http: HttpClient,
    config: AsyncValidatorConfig,
    value: unknown,
    extraParams: Record<string, primitive> = {}
): Observable<unknown> => {
    const method = config.method ?? 'GET';
    const paramName = config.paramName ?? 'value';
    const payload: Record<string, unknown> = { [paramName]: value, ...extraParams };

    if (method === 'GET') {
        const params: Record<string, string> = {};
        for (const key of Object.keys(payload)) {
            params[key] = String(payload[key]);
        }
        return http.get<unknown>(config.endpoint, { params });
    }

    return http.request<unknown>(method, config.endpoint, { body: payload });
};

/**
 * Builds an async validator that debounces, calls the configured endpoint and maps the response
 * through {@link _interpret}. `invalidWhenTrue` decides whether a `true` verdict means the value
 * is invalid (existence checks) or valid (remote validation).
 */
const _check = (
    config: AsyncValidatorConfig,
    errorKey: string,
    invalidWhenTrue: boolean,
    extraParams: Record<string, primitive> = {}
): AsyncValidatorFn => {
    const http = inject(HttpClient);
    const debounceMs = config.debounceTime ?? 300;

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (_isEmpty(control.value)) {
            return of(null);
        }

        return timer(debounceMs).pipe(
            switchMap(() => _request(http, config, control.value, extraParams)),
            map(response => (_interpret(config, response) === invalidWhenTrue ? { [errorKey]: true } : null)),
            catchError(() => of(null)),
            first()
        );
    };
};

export namespace AsyncValidators {
    /**
     * The value must already exist in the backend (e.g. a referenced record). Invalid when the
     * endpoint reports it does not exist. Must be created in an injection context (it injects
     * `HttpClient`).
     *
     * ```
     * sku: new FormControl('', [], [
     *   NguardValidators.Async.exists({ endpoint: '/api/products/exists' })
     * ])
     * ```
     *
     * @param {AsyncValidatorConfig} config Endpoint and request configuration
     * @returns {AsyncValidatorFn}
     */
    export const exists = (config: AsyncValidatorConfig): AsyncValidatorFn => _check(config, 'exists', false);

    /**
     * Generic remote validation: the endpoint decides validity. Invalid when the response is
     * interpreted as not valid. Must be created in an injection context.
     *
     * ```
     * coupon: new FormControl('', [], [
     *   NguardValidators.Async.remoteValidation({ endpoint: '/api/coupons/validate' })
     * ])
     * ```
     *
     * @param {AsyncValidatorConfig} config Endpoint and request configuration
     * @returns {AsyncValidatorFn}
     */
    export const remoteValidation = (config: AsyncValidatorConfig): AsyncValidatorFn =>
        _check(config, 'remoteValidation', false);

    /**
     * The value must be unique in the backend. Invalid when the endpoint reports it already exists.
     * Must be created in an injection context.
     *
     * ```
     * username: new FormControl('', [], [
     *   NguardValidators.Async.unique({ endpoint: '/api/users/check-username', method: 'POST' })
     * ])
     * ```
     *
     * @param {AsyncValidatorConfig} config Endpoint and request configuration
     * @returns {AsyncValidatorFn}
     */
    export const unique = (config: AsyncValidatorConfig): AsyncValidatorFn => _check(config, 'unique', true);

    /**
     * Like {@link unique} but ignores a specific record — useful on edit forms where the current
     * record legitimately owns the value. The `exceptId` is sent alongside the value (param `except`).
     * Reports the `unique` error key. Must be created in an injection context.
     *
     * ```
     * email: new FormControl('', [], [
     *   NguardValidators.Async.uniqueExcept(user.id, { endpoint: '/api/users/check-email' })
     * ])
     * ```
     *
     * @param {primitive} exceptId The id of the record to exclude from the uniqueness check
     * @param {AsyncValidatorConfig} config Endpoint and request configuration
     * @returns {AsyncValidatorFn}
     */
    export const uniqueExcept = (exceptId: primitive, config: AsyncValidatorConfig): AsyncValidatorFn =>
        _check(config, 'unique', true, { except: exceptId });
}
