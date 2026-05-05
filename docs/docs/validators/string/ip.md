# `ip`

Validate that a string is a valid IP address (IPv4 or IPv6).

## Signature

```ts
NguardValidators.String.ip: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const address = new FormControl('', [NguardValidators.String.ip]);
```

## Template-driven forms

```html
<input ngModel name="address" nguardIp />
```

## Error key

`{ ip: true }`

## Notes

- Internally checks IPv4 first, then IPv6 — passes if either matches.
- Validates **shape**, not reachability or assignment.
- Empty strings fail.

## See also

- [`ipv4`](./ipv4) — IPv4-only check
- [`ipv6`](./ipv6) — IPv6-only check
- [`macAddress`](./mac-address) — sibling network format
