---
sidebar_position: 9
---

# `odd`

Validate that a value is an odd integer.

## Signature

```ts
NguardValidators.Number.odd: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const cardsInHand = new FormControl('', [NguardValidators.Number.odd]);
```

## Template-driven forms

```html
<input ngModel name="cardsInHand" nguardOdd />
```

## Error key

`{ odd: true }`

## Notes

- Zero is **not** odd.
- Negative odd integers pass (`-3`, `-1`).
- Non-integers fail — `odd` requires both numeric **and** integer.
- Numeric strings work — `'3'` passes.

## See also

- [`even`](./even) — symmetric counterpart
- [`integer`](./integer) — without parity constraint
