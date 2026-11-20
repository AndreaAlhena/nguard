# `macAddress`

Validate that a string is a valid MAC address. Accepts colon-separated, dash-separated, and Cisco dot-separated formats — but the same separator must be used throughout.

## Signature

```ts
NguardValidators.String.macAddress: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const address = new FormControl('', [NguardValidators.String.macAddress]);
```

## Template-driven forms

```html
<input ngModel name="address" nguardMacAddress />
```

## Error key

`{ macAddress: true }`

## Notes

- Accepted formats:
  - Colon-separated: `00:1B:44:11:3A:B7`
  - Dash-separated: `00-1B-44-11-3A-B7`
  - Cisco dot-separated: `001B.4411.3AB7`
- The separator must be consistent across all groups — `00:1B-44:11-3A:B7` fails.
- Hex digits are case-insensitive.
- Empty strings fail.

## See also

- [`ip`](./ip), [`ipv4`](./ipv4), [`ipv6`](./ipv6) — sibling network format checks
