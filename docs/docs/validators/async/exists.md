---
slug: /validators/async/exists
---

# `exists`

Asynchronously checks that the value **exists** in the backend — invalid when the endpoint reports it does not.

## Signature

```ts
NguardValidators.Async.exists(config: AsyncValidatorConfig): AsyncValidatorFn
```

See [`unique`](./unique) for the `AsyncValidatorConfig` fields.

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

## Error key

`{ exists: true }`

## Notes

- Must be created in an injection context (the factory calls `inject(HttpClient)`); the directive handles this.
- Debounced with request cancellation; empty values pass without a request; HTTP errors resolve to valid.

## See also

- [`unique`](./unique) — the opposite check
