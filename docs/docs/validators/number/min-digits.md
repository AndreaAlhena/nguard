---
sidebar_position: 16
---

# `minDigits`

Validate that an integer has at least N digits.

## Signature

```ts
NguardValidators.Number.minDigits(n: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `n` | `number` | Minimum required digit count |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const id = new FormControl('', [NguardValidators.Number.minDigits(4)]);
```

## Template-driven forms

```html
<input ngModel name="id" [nguardMinDigits]="4" />
```

## Error key

`{ minDigits: true }`

## Notes

- The check is `>=` (inclusive).
- The value must be an integer. Floats fail.
- Sign is excluded from the count.

## See also

- [`maxDigits`](./max-digits) — upper-bound counterpart
- [`digitsBetween`](./digits-between) — both bounds in one validator
- [`digits`](./digits) — exact digit count
