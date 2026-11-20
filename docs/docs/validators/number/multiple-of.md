---
sidebar_position: 19
---

# `multipleOf`

Validate that a numeric value is an exact multiple of a given divisor (`value % n === 0`).

## Signature

```ts
NguardValidators.Number.multipleOf(n: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `n` | `number` | The divisor |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// Multiples of 5 — accepts 0, 5, 10, -5, etc.
const step = new FormControl('', [NguardValidators.Number.multipleOf(5)]);

// Multiples of 0.5 — accepts 0, 0.5, 1, 1.5, ...
const halves = new FormControl('', [NguardValidators.Number.multipleOf(0.5)]);
```

## Template-driven forms

```html
<input ngModel name="step" [nguardMultipleOf]="5" />
```

## Error key

`{ multipleOf: true }`

## Notes

- Zero is a multiple of any non-zero divisor (`0 % n === 0`).
- Negative multiples pass — `-10` is a multiple of `5`.
- Fractional divisors work for clean cases (`0.5`, `0.25`). Floating-point arithmetic may produce surprises for irrational values; rely on this for human-friendly steps, not high-precision math.
- Numeric strings work — `'15'` passes `multipleOf(5)`.
- `null`, `undefined`, empty string, `NaN`, `Infinity` all fail.

## See also

- [`even`](./even) — equivalent to `multipleOf(2)` for integers
- [`integer`](./integer) — combine if you want "integer multiple of N"
- [`decimal`](./decimal) — different precision concept (decimal-place count, not divisibility)
