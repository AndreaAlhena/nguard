---
sidebar_position: 1
---

# `between`

Validate that a numeric value falls within a closed range `[min, max]` (inclusive).

## Signature

```ts
NguardValidators.Number.between(minVal: number, maxVal: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `minVal` | `number` | Inclusive lower bound |
| `maxVal` | `number` | Inclusive upper bound |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const rating = new FormControl('', [NguardValidators.Number.between(1, 5)]);
```

## Template-driven forms

```html
<input ngModel name="rating" [nguardBetween]="[1, 5]" />
```

The directive accepts a `[number, number]` tuple.

## Error key

`{ between: true }`

## Notes

- The check is **inclusive** on both ends — `between(1, 5)` accepts `1` and `5`.
- Numeric strings work — `'3'` passes `between(1, 5)`.
- `null`, `undefined`, empty string, `NaN`, `Infinity` all fail.
- Throws `RangeValidatorErrors.MinGreaterThanMax` if `minVal > maxVal`.

## See also

- [`min`](./min) / [`max`](./max) — single-bound variants
