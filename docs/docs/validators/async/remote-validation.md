---
slug: /validators/async/remote-validation
---

# `remoteValidation`

Generic asynchronous validation — the **endpoint decides validity**. Invalid when the response is interpreted as not valid.

## Signature

```ts
NguardValidators.Async.remoteValidation(config: AsyncValidatorConfig): AsyncValidatorFn
```

See [`unique`](./unique) for the `AsyncValidatorConfig` fields. By default the response's `valid` property (or a truthy body) means valid; supply `interpret` for a custom shape.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

coupon = new FormControl('', {
    asyncValidators: [
        NguardValidators.Async.remoteValidation({
            endpoint: '/api/coupons/validate',
            interpret: (res) => (res as { valid: boolean }).valid,
        }),
    ],
});
```

## Template-driven forms

```html
<input ngModel name="coupon" [nguardRemoteValidation]="{ endpoint: '/api/coupons/validate' }" />
```

## Error key

`{ remoteValidation: true }`

## Notes

- Must be created in an injection context (the factory calls `inject(HttpClient)`); the directive handles this.
- Debounced with request cancellation; empty values pass without a request; HTTP errors resolve to valid.

## See also

- [`unique`](./unique) / [`exists`](./exists) — existence-oriented checks
