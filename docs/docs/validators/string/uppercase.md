# `uppercase`

Validate that a string is entirely uppercase (no lowercase characters anywhere).

## Signature

```ts
NguardValidators.String.uppercase: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const code = new FormControl('', [NguardValidators.String.uppercase]);
```

## Template-driven forms

```html
<input ngModel name="code" nguardUppercase />
```

## Error key

`{ uppercase: true }`

## Notes

- The check uses `value.toUpperCase() === value` — any case-insensitive character (digits, symbols) trivially passes.
- Empty strings fail (length must be greater than zero).
- `null`, `undefined`, non-string inputs all fail.

## See also

- [`lowercase`](./lowercase) — symmetric counterpart
