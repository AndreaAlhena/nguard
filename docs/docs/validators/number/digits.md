---
sidebar_position: 14
---

# `digits`

Validate that an integer has exactly N digits (sign and decimal point excluded).

## Signature

```ts
NguardValidators.Number.digits(n: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `n` | `number` | The required digit count |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const pin = new FormControl('', [NguardValidators.Number.digits(4)]);
```

## Template-driven forms

```html
<input ngModel name="pin" [nguardDigits]="4" />
```

## Error key

`{ digits: true }`

## Notes

- The value must be an **integer** — floats fail (`1.23` is invalid for any `digits(n)`).
- Sign is excluded from the count: `-1234` has 4 digits.
- Numeric strings work — `'1234'` passes `digits(4)`.
- `null`, `undefined`, empty string, `NaN`, `Infinity`, non-numeric strings all fail.

## See also

- [`digitsBetween`](./digits-between) — range form
- [`minDigits`](./min-digits) / [`maxDigits`](./max-digits) — single-bound variants
- [`integer`](./integer) — integer check without digit-count constraint
