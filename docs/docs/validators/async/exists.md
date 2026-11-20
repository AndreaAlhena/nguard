---
slug: /validators/async/exists
---

# `exists`

Asynchronously checks that the value **exists** in the backend.

## Signature

```ts
NguardValidators.Async.exists(config: AsyncValidatorConfig): AsyncValidatorFn
```

See [`unique`](./unique) for the full `AsyncValidatorConfig` (incl. the `resolve` callback).

## Default rule (no `resolve`)

| Response | Result |
|---|---|
| `2xx` (found) | valid |
| `404` (not found) | **invalid** `{ exists: true }` |
| anything else | undecided → valid |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

productSku = new FormControl('', {
    asyncValidators: [NguardValidators.Async.exists({ endpoint: '/api/products/exists' })],
});
```

## Template-driven forms

```html
<input ngModel name="sku" [nguardExists]="{ endpoint: '/api/products/exists' }" />
```

## Custom rule

```ts
import { HttpResponse } from '@angular/common/http';

NguardValidators.Async.exists({
    endpoint: '/api/products/lookup',
    resolve: (res) => (res instanceof HttpResponse ? Array.isArray(res.body) && res.body.length > 0 : null),
});
```

## Error key

`{ exists: true }`

## Notes

- Must be created in an injection context (the factory calls `inject(HttpClient)`); the directive handles this.
- Debounced with request cancellation; empty values pass without a request; transport failures resolve to valid.

## See also

- [`unique`](./unique) — the opposite check
