---
slug: /validators/async/unique
---

# `unique`

Asynchronously checks that the value is **unique** in the backend — invalid when the endpoint reports it already exists.

## Signature

```ts
NguardValidators.Async.unique(config: AsyncValidatorConfig): AsyncValidatorFn
```

`AsyncValidatorConfig`:

| Field | Type | Default | Description |
|---|---|---|---|
| `endpoint` | `string` | — | URL to check against |
| `method` | `'GET' \| 'POST' \| 'PUT'` | `'GET'` | GET sends the value as a query param; POST/PUT in the body |
| `paramName` | `string` | `'value'` | Key carrying the value |
| `debounceTime` | `number` | `300` | Debounce (ms) before the request |
| `interpret` | `(response) => boolean` | reads `exists`/`valid`, else `Boolean(response)` | Maps the response to an "exists" verdict |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// In a component field (an injection context — the factory calls inject(HttpClient))
username = new FormControl('', {
    asyncValidators: [NguardValidators.Async.unique({ endpoint: '/api/users/check-username', method: 'POST' })],
});
```

## Template-driven forms

```html
<input ngModel name="username" [nguardUnique]="{ endpoint: '/api/users/check-username' }" />
```

## Error key

`{ unique: true }`

## Notes

- **Must be created in an injection context** (component field/constructor) because the factory calls `inject(HttpClient)`. The directive handles this for you.
- Debounced; Angular cancels the in-flight request when the value changes again. `control.pending` is `true` while the request is outstanding.
- Empty values pass without a request (pair with `Validators.required`). HTTP/network errors resolve to valid (don't block submit on transport failure).

## See also

- [`uniqueExcept`](./unique-except) — ignore the current record on edit forms
- [`exists`](./exists) — the opposite check
