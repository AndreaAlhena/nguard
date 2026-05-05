# `endsWith`

Validate that a string ends with at least one of the given substrings (case-insensitive).

## Signature

```ts
NguardValidators.String.endsWith(...values: primitive[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `primitive[]` | One or more substrings — the input must end with at least one of them |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const filename = new FormControl('', [
    NguardValidators.String.endsWith('.png', '.jpg', '.gif'),
]);
```

## Template-driven forms

```html
<input ngModel name="filename" [nguardEndsWith]="['.png', '.jpg', '.gif']" />
```

## Error key

`{ endsWith: true }`

## Notes

- The check is **case-insensitive**.
- Numbers and booleans are coerced to string before comparison.
- Empty strings fail.
- If no values are supplied, validation always fails.

## See also

- [`startsWith`](./starts-with) — sibling check on the leading end
- [`doesntEndWith`](./doesnt-end-with) — opposite check
- [`contains`](./contains) — anywhere in the string
