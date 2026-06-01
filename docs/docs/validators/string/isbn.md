# `isbn`

The value must be a valid **ISBN-10** or **ISBN-13** (check digit verified). Spaces and dashes are ignored.

## Signature

```ts
NguardValidators.String.isbn: ValidatorFn
```

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.isbn]);
```

## Template-driven forms

```html
<input ngModel name="isbn" nguardIsbn />
```

## Error key

`{ isbn: true }`

## Notes

- ISBN-10 uses the mod-11 check (final `X` allowed); ISBN-13 uses the EAN-13 mod-10 check.

## See also

- [`ean`](./ean) — EAN barcodes
