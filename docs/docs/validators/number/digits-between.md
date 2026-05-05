---
sidebar_position: 15
---

# `digitsBetween`

Validate that an integer's digit count falls within a closed range `[min, max]` (inclusive).

## Signature

```ts
NguardValidators.Number.digitsBetween(minVal: number, maxVal: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `minVal` | `number` | Inclusive minimum digit count |
| `maxVal` | `number` | Inclusive maximum digit count |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const code = new FormControl('', [NguardValidators.Number.digitsBetween(4, 6)]);
```

## Template-driven forms

```html
<input ngModel name="code" [nguardDigitsBetween]="[4, 6]" />
```

The directive accepts a `[number, number]` tuple.

## Error key

`{ digitsBetween: true }`

## Notes

- The value must be an **integer**. Floats fail.
- The range is inclusive on both ends.
- Sign is excluded from the count.
- Throws `RangeValidatorErrors.MinGreaterThanMax` if `minVal > maxVal`.

## See also

- [`digits`](./digits) — exact digit count
- [`minDigits`](./min-digits) / [`maxDigits`](./max-digits) — single-bound variants
