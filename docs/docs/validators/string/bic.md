# `bic`

The value must be a valid **BIC / SWIFT** code — 8 or 11 characters: 4-letter bank code, 2-letter country, 2-character location, and an optional 3-character branch.

## Signature

```ts
NguardValidators.String.bic: ValidatorFn
```

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.bic]);
```

## Template-driven forms

```html
<input ngModel name="bic" nguardBic />
```

## Error key

`{ bic: true }`

## Notes

- Pattern: `^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$`. Upper-case only.

## See also

- [`iban`](./iban) — bank account number
