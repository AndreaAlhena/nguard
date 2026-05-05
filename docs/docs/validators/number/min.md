---
sidebar_position: 2
---

# `min`

Validate that a numeric value is greater than or equal to a literal minimum.

## Signature

```ts
NguardValidators.Number.min(minVal: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `minVal` | `number` | Inclusive minimum allowed value |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const age = new FormControl('', [NguardValidators.Number.min(18)]);
```

## Template-driven forms

```html
<input ngModel name="age" [nguardMin]="18" />
```

## Error key

`{ min: true }`

## Notes

- The check is `>=` (inclusive). `min(18)` accepts `18`.
- Numeric strings work — `'18'` passes `min(18)`.
- `null`, `undefined`, empty string, `NaN`, `Infinity` all fail.

## See also

- [`max`](./max) — upper-bound counterpart
- [`between`](./between) — both bounds in one validator
- [`greaterThanOrEqual`](./greater-than-or-equal) — same operator but compares against a sibling field instead of a literal
