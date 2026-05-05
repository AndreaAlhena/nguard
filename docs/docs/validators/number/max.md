---
sidebar_position: 3
---

# `max`

Validate that a numeric value is less than or equal to a literal maximum.

## Signature

```ts
NguardValidators.Number.max(maxVal: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `maxVal` | `number` | Inclusive maximum allowed value |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const quantity = new FormControl('', [NguardValidators.Number.max(100)]);
```

## Template-driven forms

```html
<input ngModel name="quantity" [nguardMax]="100" />
```

## Error key

`{ max: true }`

## Notes

- The check is `<=` (inclusive). `max(100)` accepts `100`.
- Numeric strings work — `'100'` passes `max(100)`.
- `null`, `undefined`, empty string, `NaN`, `Infinity` all fail.

## See also

- [`min`](./min) — lower-bound counterpart
- [`between`](./between) — both bounds in one validator
- [`lesserThanOrEqual`](./lesser-than-or-equal) — same operator but compares against a sibling field instead of a literal
