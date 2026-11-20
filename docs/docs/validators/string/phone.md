# `phone`

The value must be a valid **phone number**, validated with [`libphonenumber-js`](https://www.npmjs.com/package/libphonenumber-js). Without a country the value must be in **E.164** format (e.g. `+14155552671`); pass a country to accept national formats.

## Signature

```ts
NguardValidators.String.phone(defaultCountry?: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `defaultCountry` | `string` (optional) | ISO 3166-1 alpha-2 country code (e.g. `'US'`) for national-format numbers |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// E.164 (no country)
new FormControl('', [NguardValidators.String.phone()]);

// National format for a country
new FormControl('', [NguardValidators.String.phone('US')]);
```

## Template-driven forms

```html
<!-- E.164 -->
<input ngModel name="phone" nguardPhone />

<!-- national format for a country -->
<input ngModel name="phone" [nguardPhone]="'US'" />
```

## Error key

`{ phone: true }`

## Dependency

`phone` is the only validator that needs an external package. **`libphonenumber-js`** is an **optional `peerDependency`** — install it only if you use `phone`:

```bash
npm install libphonenumber-js
```

If you never use `phone`, tree-shaking removes it and the dependency is never required.

## Notes

- Invalid input (and anything libphonenumber-js cannot parse) fails rather than throwing.

## See also

- [`postalCode`](./postal-code) — country-aware postal codes
