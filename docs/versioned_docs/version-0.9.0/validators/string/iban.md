# `iban`

The value must be a valid **IBAN** — correct country prefix, expected length (for known countries), and the ISO 7064 **mod-97** checksum. Spaces are ignored.

## Signature

```ts
NguardValidators.String.iban: ValidatorFn
```

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.iban]);
```

## Template-driven forms

```html
<input ngModel name="iban" nguardIban />
```

## Error key

`{ iban: true }`

## Notes

- Spaces are stripped and letters upper-cased before validation.
- Length is enforced for a built-in set of countries; the mod-97 checksum is always verified.

## See also

- [`bic`](./bic) — BIC / SWIFT code
- [`creditCard`](./credit-card) — card numbers (Luhn)
