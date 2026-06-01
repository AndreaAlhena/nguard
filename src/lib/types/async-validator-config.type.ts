import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

/**
 * The full HTTP outcome handed to a {@link AsyncValidatorConfig.resolve} callback — either a
 * successful response or an error response. Both expose `.status`; `HttpResponse` also exposes
 * `.body` and `.headers`.
 */
export type AsyncResponse = HttpResponse<unknown> | HttpErrorResponse;

/**
 * Configuration for the asynchronous, HTTP-backed validators in the `Async` namespace
 * (`unique`, `exists`, `uniqueExcept`, `remoteValidation`).
 */
export type AsyncValidatorConfig = {
    /**
     * Debounce in milliseconds before the request fires. Each change restarts the timer and the
     * in-flight request is cancelled. Default `300`.
     */
    debounceTime?: number;
    /**
     * The endpoint URL the value is checked against.
     */
    endpoint: string;
    /**
     * HTTP method. `GET` sends the value as a query parameter; `POST` / `PUT` send it in the body.
     * Default `'GET'`.
     */
    method?: 'GET' | 'POST' | 'PUT';
    /**
     * The key carrying the value — a query-parameter name for `GET`, a body key for `POST` / `PUT`.
     * Default `'value'`.
     */
    paramName?: string;
    /**
     * Decide validity from the **full response** (or HTTP error). Inspect the status code, headers,
     * or the body — however it is shaped or nested. Return `true` for valid, `false` for invalid,
     * or `null` / `undefined` to leave it undecided (treated as valid, so transient failures don't
     * block submission). When provided, this **fully replaces** the validator's default status-code
     * rule.
     *
     * ```
     * resolve: (res) => res instanceof HttpResponse && (res.body as { data?: { free?: boolean } })?.data?.free === true
     * ```
     */
    resolve?: (response: AsyncResponse) => boolean | null;
};
