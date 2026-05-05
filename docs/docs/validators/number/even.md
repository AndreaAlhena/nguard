---
sidebar_position: 8
---

# `even`

Validate that a value is an even integer.

## Signature

```ts
NguardValidators.Number.even: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const seatsPerRow = new FormControl('', [NguardValidators.Number.even]);
```

## Template-driven forms

```html
<input ngModel name="seatsPerRow" nguardEven />
```

## Error key

`{ even: true }`

## Notes

- Zero is even (`0 % 2 === 0`).
- Negative even integers pass (`-4`, `-2`).
- Non-integers fail — `even` requires both numeric **and** integer.
- Numeric strings work — `'4'` passes.

## See also

- [`odd`](./odd) — symmetric counterpart
- [`integer`](./integer) — without parity constraint
