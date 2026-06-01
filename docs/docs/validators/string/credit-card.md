# `creditCard`

The value must be a valid **credit card number** — 13–19 digits (spaces and dashes allowed) passing the **Luhn** checksum.

## Signature

```ts
NguardValidators.String.creditCard: ValidatorFn
```

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.creditCard]);
```

## Template-driven forms

```html
<input ngModel name="card" nguardCreditCard />
```

## Error key

`{ creditCard: true }`

## Notes

- Spaces and dashes are stripped before validation. Only the **length + Luhn** are checked — not whether the card network/BIN is real.

## See also

- [`ean`](./ean) — barcode check digit
- [`iban`](./iban) — bank account number
