# `doesntEndWith`

Validate that a string does **not** end with any of the given substrings (case-insensitive).

## Signature

```ts
NguardValidators.String.doesntEndWith(...values: primitive[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `primitive[]` | One or more substrings — the input must end with **none** of them |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

// Reject filenames ending in temp extensions
const filename = new FormControl('', [
    NguardValidators.String.doesntEndWith('.tmp', '.bak'),
]);
```

## Template-driven forms

```html
<input ngModel name="filename" [nguardDoesntEndWith]="['.tmp', '.bak']" />
```

## Error key

`{ doesntEndWith: true }`

## Notes

- The check is **case-insensitive**.
- Numbers and booleans are coerced to string before comparison.
- Empty strings pass.
- If no values are supplied, validation passes.

## See also

- [`endsWith`](./ends-with) — opposite check
- [`doesntStartWith`](./doesnt-start-with) — sibling check on the leading end
- [`notContains`](./not-contains) — anywhere in the string
