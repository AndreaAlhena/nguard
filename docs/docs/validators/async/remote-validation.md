---
slug: /validators/async/remote-validation
---

# `remoteValidation`

Generic asynchronous validation — the **endpoint decides validity**.

## Signature

```ts
NguardValidators.Async.remoteValidation(config: AsyncValidatorConfig): AsyncValidatorFn
```

See [`unique`](./unique) for the full `AsyncValidatorConfig` (incl. the `resolve` callback).

## Default rule (no `resolve`)

| Response | Result |
|---|---|
| `2xx` | valid |
| `4xx` (e.g. `422`) | **invalid** `{ remoteValidation: true }` |
| anything else (`5xx`, network) | undecided → valid |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { NguardValidators } from 'ng-nguard';

coupon = new FormControl('', {
    asyncValidators: [
        NguardValidators.Async.remoteValidation({
            endpoint: '/api/coupons/validate',
            // optional: override the status-code default with your own rule
            resolve: (res) => (res instanceof HttpResponse ? (res.body as { ok: boolean }).ok : null),
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
- Debounced with request cancellation; empty values pass without a request; transport/server failures resolve to valid.

## See also

- [`unique`](./unique) / [`exists`](./exists) — existence-oriented checks
