---
sidebar_position: 18
---

# `decimal`

Validate that a number has a specific count of decimal places. Supports an exact form (`decimal(2)`) and an inclusive range form (`decimal(1, 3)`).

## Signature

```ts
NguardValidators.Number.decimal(
    minPlaces: number,
    maxPlaces?: number,
): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `minPlaces` | `number` | — | Required (or minimum) decimal places |
| `maxPlaces` | `number` | `undefined` | Optional maximum decimal places — present means range form |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// Exact: requires '1.23' (two decimal places)
const price = new FormControl('', [NguardValidators.Number.decimal(2)]);

// Range: accepts '1.2', '1.23', or '1.234' but rejects '1' or '1.2345'
const measurement = new FormControl('', [NguardValidators.Number.decimal(1, 3)]);
```

## Template-driven forms

```html
<!-- Exact form: pass a number -->
<input ngModel name="price" [nguardDecimal]="2" />

<!-- Range form: pass a [min, max] tuple -->
<input ngModel name="measurement" [nguardDecimal]="[1, 3]" />
```

## Error key

`{ decimal: true }`

## Notes

- Decimal place count is taken from the string representation: `1.5` has 1 decimal, `1.50` has 2 (when passed as the string `'1.50'`).
- An integer value has 0 decimal places — `decimal(0)` accepts integers.
- Throws `RangeValidatorErrors.MinGreaterThanMax` if `minPlaces > maxPlaces` in range form.
- `null`, `undefined`, empty string, `NaN`, `Infinity`, non-numeric strings all fail.

## See also

- [`numeric`](./numeric) — type check without decimal-place constraint
- [`integer`](./integer) — equivalent to `decimal(0)`
- [`multipleOf`](./multiple-of) — different precision concept (divisibility, not decimal-place count)
