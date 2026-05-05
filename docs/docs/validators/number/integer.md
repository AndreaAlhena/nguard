---
sidebar_position: 7
---

# `integer`

Validate that a value is an integer (whole number, no fractional part).

## Signature

```ts
NguardValidators.Number.integer: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const age = new FormControl('', [NguardValidators.Number.integer]);
```

## Template-driven forms

```html
<input ngModel name="age" nguardInteger />
```

## Error key

`{ integer: true }`

## Notes

- Accepts integers and integer-like numeric strings (`'42'`, `'-5'`, `'0'`).
- Rejects floats (`3.14`, `'3.14'`), `null`, `undefined`, empty string, `NaN`, `Infinity`, non-numeric strings.
- Numeric coercion applies — strings are tried as numbers first, then checked with `Number.isInteger`.

## See also

- [`numeric`](./numeric) — looser: floats also accepted
- [`even`](./even) / [`odd`](./odd) — additional parity constraints
- [`digits`](./digits) — exact digit count
