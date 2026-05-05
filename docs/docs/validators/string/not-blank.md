# `notBlank`

Validate that a string is not empty and not whitespace-only.

## Signature

```ts
NguardValidators.String.notBlank: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const title = new FormControl('', [NguardValidators.String.notBlank]);
```

## Template-driven forms

```html
<input ngModel name="title" nguardNotBlank />
```

## Error key

`{ notBlank: true }`

## Notes

- The check is `value.trim().length > 0`.
- Empty strings fail; strings with only spaces, tabs, newlines fail.
- A string with at least one non-whitespace character passes — `' a '` is valid.
- `null`, `undefined`, non-string inputs all fail.

## See also

- Angular's `Validators.required` — fails on empty but not on whitespace-only. Use `notBlank` when whitespace must also be rejected.
- [`minLength`](./min-length) — stricter character-count constraint
