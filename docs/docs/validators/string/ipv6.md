# `ipv6`

Validate that a string is a valid IPv6 address. Accepts full and compressed forms.

## Signature

```ts
NguardValidators.String.ipv6: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const address = new FormControl('', [NguardValidators.String.ipv6]);
```

## Template-driven forms

```html
<input ngModel name="address" nguardIpv6 />
```

## Error key

`{ ipv6: true }`

## Notes

- Accepts:
  - Full form (`2001:0db8:85a3:0000:0000:8a2e:0370:7334`)
  - Compressed form (`2001:db8::1`)
  - Loopback (`::1`)
  - Unspecified (`::`)
- IPv4-mapped IPv6 (`::ffff:192.0.2.1`) is **not** supported by the bundled regex.
- IPv4 addresses fail — use [`ipv4`](./ipv4) or [`ip`](./ip) for those.
- Empty strings fail.

## See also

- [`ip`](./ip) — accepts IPv4 or IPv6
- [`ipv4`](./ipv4) — IPv4-only check
