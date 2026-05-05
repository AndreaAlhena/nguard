# `doesntStartWith`

Validate that a string does **not** start with any of the given substrings (case-insensitive).

## Signature

```ts
NguardValidators.String.doesntStartWith(...values: primitive[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `primitive[]` | One or more substrings — the input must start with **none** of them |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

// Reject relative protocol URLs
const externalUrl = new FormControl('', [
    NguardValidators.String.doesntStartWith('//', '/'),
]);
```

## Template-driven forms

```html
<input ngModel name="externalUrl" [nguardDoesntStartWith]="['//', '/']" />
```

## Error key

`{ doesntStartWith: true }`

## Notes

- The check is **case-insensitive**.
- Numbers and booleans are coerced to string before comparison.
- Empty strings pass (nothing to start with).
- If no values are supplied, validation passes (no constraint to violate).

## See also

- [`startsWith`](./starts-with) — opposite check
- [`doesntEndWith`](./doesnt-end-with) — sibling check on the trailing end
- [`notContains`](./not-contains) — anywhere in the string
