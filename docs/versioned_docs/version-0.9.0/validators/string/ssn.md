# `ssn`

The value must be a valid **US Social Security Number** — `AAA-GG-SSSS` (dashes optional), excluding the ranges the SSA never issues.

## Signature

```ts
NguardValidators.String.ssn: ValidatorFn
```

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.ssn]);
```

## Template-driven forms

```html
<input ngModel name="ssn" nguardSsn />
```

## Error key

`{ ssn: true }`

## Notes

- Rejects area `000`, `666`, and `900–999`; group `00`; and serial `0000`.
- Accepts both `123-45-6789` and `123456789`.

## See also

- [`vatNumber`](./vat-number) — EU VAT numbers
