# `startsWith`

Validate that a string starts with at least one of the given substrings (case-insensitive).

## Signature

```ts
NguardValidators.String.startsWith(...values: primitive[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `primitive[]` | One or more substrings — the input must start with at least one of them |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const url = new FormControl('', [
    NguardValidators.String.startsWith('http://', 'https://'),
]);
```

## Template-driven forms

```html
<!-- Single value: pass directly -->
<input ngModel name="url" [nguardStartsWith]="'https://'" />

<!-- Multiple values: pass an array -->
<input ngModel name="url" [nguardStartsWith]="['http://', 'https://']" />
```

## Error key

`{ startsWith: true }`

## Notes

- The check is **case-insensitive**.
- Numbers and booleans are coerced to string before comparison.
- Empty strings fail.
- If no values are supplied (`startsWith()`), validation always fails.

## See also

- [`endsWith`](./ends-with) — sibling check on the trailing end
- [`doesntStartWith`](./doesnt-start-with) — opposite check
- [`contains`](./contains) — anywhere in the string, not just the beginning
