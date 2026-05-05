# `lowercase`

Validate that a string is entirely lowercase (no uppercase characters anywhere).

## Signature

```ts
NguardValidators.String.lowercase: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const slug = new FormControl('', [NguardValidators.String.lowercase]);
```

## Template-driven forms

```html
<input ngModel name="slug" nguardLowercase />
```

## Error key

`{ lowercase: true }`

## Notes

- The check uses `value.toLowerCase() === value` — any case-insensitive character (digits, symbols) trivially passes.
- Empty strings fail (length must be greater than zero).
- `null`, `undefined`, non-string inputs all fail.

## See also

- [`uppercase`](./uppercase) — symmetric counterpart
- [`slug`](./slug) — stricter: lowercase alphanumeric with dashes
