# `ean`

The value must be a valid **EAN-8** or **EAN-13** barcode (check digit verified).

## Signature

```ts
NguardValidators.String.ean: ValidatorFn
```

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.ean]);
```

## Template-driven forms

```html
<input ngModel name="barcode" nguardEan />
```

## Error key

`{ ean: true }`

## Notes

- The value must be exactly 8 or 13 digits; the final digit is verified as the standard check digit.

## See also

- [`isbn`](./isbn) — ISBN (ISBN-13 is an EAN)
