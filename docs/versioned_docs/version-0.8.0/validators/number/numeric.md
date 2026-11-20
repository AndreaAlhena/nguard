---
sidebar_position: 6
---

# `numeric`

Validate that a value is numeric (integer or floating point, including numeric strings).

## Signature

```ts
NguardValidators.Number.numeric: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const price = new FormControl('', [NguardValidators.Number.numeric]);
```

## Template-driven forms

```html
<input ngModel name="price" nguardNumeric />
```

## Error key

`{ numeric: true }`

## Notes

- Accepts integers, floating point, and numeric strings (`'42'`, `'3.14'`, `'-5'`).
- Rejects `null`, `undefined`, empty string, `NaN`, `Infinity`, non-numeric strings (`'abc'`, `'1abc'`), booleans, objects, arrays.
- Use this when you need a "must be a number" check without bounds.

## See also

- [`integer`](./integer) — stricter: only whole numbers
- [`min`](./min) / [`max`](./max) / [`between`](./between) — combine with bounds
