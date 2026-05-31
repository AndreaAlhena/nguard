---
sidebar_position: 17
---

# `maxDigits`

Validate that an integer has at most N digits.

## Signature

```ts
NguardValidators.Number.maxDigits(n: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `n` | `number` | Maximum allowed digit count |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const code = new FormControl('', [NguardValidators.Number.maxDigits(6)]);
```

## Template-driven forms

```html
<input ngModel name="code" [nguardMaxDigits]="6" />
```

## Error key

`{ maxDigits: true }`

## Notes

- The check is `<=` (inclusive).
- The value must be an integer. Floats fail.
- Sign is excluded from the count.

## See also

- [`minDigits`](./min-digits) — lower-bound counterpart
- [`digitsBetween`](./digits-between) — both bounds in one validator
- [`digits`](./digits) — exact digit count
