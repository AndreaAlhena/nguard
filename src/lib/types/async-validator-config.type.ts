/**
 * Configuration for the asynchronous, HTTP-backed validators in the `Async` namespace
 * (`unique`, `exists`, `uniqueExcept`, `remoteValidation`).
 */
export type AsyncValidatorConfig = {
    /**
     * Debounce in milliseconds before the request fires. Each keystroke restarts the timer,
     * and Angular cancels the in-flight request on change. Default `300`.
     */
    debounceTime?: number;
    /**
     * The endpoint URL the value is checked against.
     */
    endpoint: string;
    /**
     * Maps the raw HTTP response to a boolean verdict. The meaning depends on the validator:
     * "does the value exist" for `unique` / `exists` / `uniqueExcept`, "is the value valid" for
     * `remoteValidation`. When omitted, an object response is read via its `exists` then `valid`
     * property, otherwise `Boolean(response)` is used.
     */
    interpret?: (response: unknown) => boolean;
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
};
