# `postalCode`

The value must be a valid **postal code**. Pass an ISO 3166-1 alpha-2 country code for a country-specific format; otherwise a generic alphanumeric check applies.

## Signature

```ts
NguardValidators.String.postalCode(country?: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `country` | `string` (optional) | ISO 3166-1 alpha-2 country code (e.g. `'US'`, `'GB'`, `'CA'`) |

Built-in country formats: `US`, `GB`, `CA`, `DE`, `FR`, `IT`, `ES`, `NL`, `AU`, `JP`. Unknown/omitted country → generic check.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.postalCode('US')]);
```

## Template-driven forms

```html
<input ngModel name="zip" [nguardPostalCode]="'US'" />
<input ngModel name="zip" nguardPostalCode />
```

## Error key

`{ postalCode: true }`

## Notes

- Format-level, not authoritative — it checks shape, not whether the code is actually assigned.

## See also

- [`vatNumber`](./vat-number) — country-aware VAT numbers
