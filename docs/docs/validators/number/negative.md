---
sidebar_position: 5
---

# `negative`

Validate that a numeric value is strictly less than zero.

## Signature

```ts
NguardValidators.Number.negative: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const temperature = new FormControl('', [NguardValidators.Number.negative]);
```

## Template-driven forms

```html
<input ngModel name="temperature" nguardNegative />
```

## Error key

`{ negative: true }`

## Notes

- The check is **strict** (`< 0`). Zero fails.
- Numeric strings work — `'-5'` passes; `'0'` fails.
- `null`, `undefined`, empty string, `NaN`, `Infinity` all fail.

## See also

- [`positive`](./positive) — symmetric counterpart
- [`max`](./max) — pass `max(0)` if you want to allow zero (`<= 0` instead of `< 0`)
