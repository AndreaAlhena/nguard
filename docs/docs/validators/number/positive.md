---
sidebar_position: 4
---

# `positive`

Validate that a numeric value is strictly greater than zero.

## Signature

```ts
NguardValidators.Number.positive: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const amount = new FormControl('', [NguardValidators.Number.positive]);
```

## Template-driven forms

```html
<input ngModel name="amount" nguardPositive />
```

## Error key

`{ positive: true }`

## Notes

- The check is **strict** (`> 0`). Zero fails.
- Numeric strings work — `'5'` passes; `'0'` fails.
- `null`, `undefined`, empty string, `NaN`, `Infinity` all fail.

## See also

- [`negative`](./negative) — symmetric counterpart
- [`min`](./min) — pass `min(0)` if you want to allow zero (`>= 0` instead of `> 0`)
