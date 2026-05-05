# `ipv4`

Validate that a string is a valid IPv4 address (four 0-255 octets, dotted notation).

## Signature

```ts
NguardValidators.String.ipv4: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const address = new FormControl('', [NguardValidators.String.ipv4]);
```

## Template-driven forms

```html
<input ngModel name="address" nguardIpv4 />
```

## Error key

`{ ipv4: true }`

## Notes

- Pattern: `^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$`.
- Accepts canonical octets only — `0.0.0.0` and `255.255.255.255` are valid; `999.0.0.1` and `192.168.1` are not.
- IPv6 addresses fail.
- Empty strings fail.

## See also

- [`ip`](./ip) — accepts IPv4 or IPv6
- [`ipv6`](./ipv6) — IPv6-only check
