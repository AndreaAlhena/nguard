# `notRegex`

Validate that a string does **not** match a given regular expression.

## Signature

```ts
NguardValidators.String.notRegex(pattern: RegExp): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `pattern` | `RegExp` | The pattern that must **not** match the input |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// Reject any digit in the username
const username = new FormControl('', [
    NguardValidators.String.notRegex(/\d/),
]);
```

## Template-driven forms

```html
<input ngModel name="username" [nguardNotRegex]="/\d/" />
```

## Error key

`{ notRegex: true }`

## Notes

- Returns `null` (valid) if the pattern does not match.
- Returns `{ notRegex: true }` if the pattern matches.
- `null`, `undefined`, non-string inputs all fail.

## See also

- [`regex`](./regex) — opposite check (must match)
