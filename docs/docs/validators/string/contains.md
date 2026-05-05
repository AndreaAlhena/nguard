# `contains`

Validate that a string contains at least one of the given substrings (case-insensitive).

## Signature

```ts
NguardValidators.String.contains(...values: primitive[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `primitive[]` | One or more substrings — the input must contain at least one of them |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const description = new FormControl('', [
    NguardValidators.String.contains('angular', 'nguard'),
]);
```

## Template-driven forms

```html
<input ngModel name="description" [nguardContains]="['angular', 'nguard']" />
```

## Error key

`{ contains: true }`

## Notes

- The check is **case-insensitive**.
- Numbers and booleans are coerced to string before the substring search.
- Empty strings fail unless an empty-string value is supplied (`contains('')` always passes against any string).
- If no values are supplied, validation always fails.

## See also

- [`notContains`](./not-contains) — opposite check
- [`startsWith`](./starts-with) / [`endsWith`](./ends-with) — anchored variants
