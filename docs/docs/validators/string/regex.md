# `regex`

Validate that a string matches a given regular expression.

## Signature

```ts
NguardValidators.String.regex(pattern: RegExp): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `pattern` | `RegExp` | The pattern the input must match |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

// Three uppercase letters
const code = new FormControl('', [
    NguardValidators.String.regex(/^[A-Z]{3}$/),
]);
```

## Template-driven forms

```html
<input ngModel name="code" [nguardRegex]="/^[A-Z]{3}$/" />
```

## Error key

`{ regex: true }`

## Notes

- Returns `null` (valid) if the pattern matches.
- Returns `{ regex: true }` if it does not.
- `null`, `undefined`, non-string inputs all fail.
- Anchor your patterns (`^...$`) when you need full-string matching — `regex(/abc/)` allows `'xabcy'`.

## See also

- [`notRegex`](./not-regex) — opposite check (must not match)
- [`alpha`](./alpha), [`alphaNum`](./alpha-num), [`alphaDash`](./alpha-dash) — common shorthand patterns
