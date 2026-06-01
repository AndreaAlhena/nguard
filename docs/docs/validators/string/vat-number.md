# `vatNumber`

The value must be a valid **EU VAT number**. Pass an ISO 3166-1 alpha-2 country code to check a specific country's format; otherwise any known EU format is accepted. Spaces are ignored.

## Signature

```ts
NguardValidators.String.vatNumber(country?: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `country` | `string` (optional) | ISO 3166-1 alpha-2 country code (e.g. `'DE'`) |

Built-in country formats: `AT`, `BE`, `DE`, `DK`, `ES`, `FR`, `GB`, `IT`, `NL`, `PL`.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.vatNumber('DE')]);
```

## Template-driven forms

```html
<input ngModel name="vat" [nguardVatNumber]="'DE'" />
<input ngModel name="vat" nguardVatNumber />
```

## Error key

`{ vatNumber: true }`

## Notes

- Format-level (country prefix + structure), not a VIES existence check.

## See also

- [`postalCode`](./postal-code) — country-aware postal codes
