---
slug: /validators/async/unique
---

# `unique`

Asynchronously checks that the value is **unique** in the backend.

## Signature

```ts
NguardValidators.Async.unique(config: AsyncValidatorConfig): AsyncValidatorFn
```

### `AsyncValidatorConfig`

| Field | Type | Default | Description |
|---|---|---|---|
| `endpoint` | `string` | — | URL to check against |
| `method` | `'GET' \| 'POST' \| 'PUT'` | `'GET'` | GET sends the value as a query param; POST/PUT in the body |
| `paramName` | `string` | `'value'` | Key carrying the value |
| `debounceTime` | `number` | `300` | Debounce (ms) before the request |
| `resolve` | `(response: HttpResponse \| HttpErrorResponse) => boolean \| null` | status-code rule | Your own verdict from the full response — `true` = valid, `false` = invalid, `null` = undecided (valid) |

## Default rule (no `resolve`)

Status code only — the library never assumes a response body shape:

| Response | Meaning | Result |
|---|---|---|
| `2xx` | the value exists (taken) | **invalid** `{ unique: true }` |
| `404` | not found (free) | valid |
| anything else (`5xx`, network) | undecided | valid (don't block) |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// In a component field (an injection context — the factory calls inject(HttpClient))
username = new FormControl('', {
    asyncValidators: [NguardValidators.Async.unique({ endpoint: '/api/users/check-username' })],
});
```

## Template-driven forms

```html
<input ngModel name="username" [nguardUnique]="{ endpoint: '/api/users/check-username' }" />
```

## Custom rule

Most backends are not REST-compliant and won't signal availability by status code — so define your own rule from the **whole response** (status, headers, or a body however it is nested):

```ts
import { HttpResponse } from '@angular/common/http';

NguardValidators.Async.unique({
    endpoint: '/api/users/check-username', // always returns 200 with { data: { taken: boolean } }
    resolve: (res) => (res instanceof HttpResponse ? (res.body as { data: { taken: boolean } }).data.taken === false : null),
});
```

## Error key

`{ unique: true }`

## Notes

- **Must be created in an injection context** (component field/constructor); the directive handles this for you.
- Debounced; Angular cancels the in-flight request on the next change. `control.pending` is `true` while it runs.
- Empty values pass without a request. Transport/server failures resolve to undecided (valid) so they don't block submission.

## See also

- [`uniqueExcept`](./unique-except) — ignore the current record on edit forms
- [`exists`](./exists) — the opposite check
