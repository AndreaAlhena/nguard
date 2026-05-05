# `notContains`

Validate that a string contains **none** of the given substrings (case-insensitive).

## Signature

```ts
NguardValidators.String.notContains(...values: primitive[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `primitive[]` | One or more substrings — the input must contain **none** of them |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const message = new FormControl('', [
    NguardValidators.String.notContains('badword', 'forbidden'),
]);
```

## Template-driven forms

```html
<input ngModel name="message" [nguardNotContains]="['badword', 'forbidden']" />
```

## Error key

`{ notContains: true }`

## Notes

- The check is **case-insensitive**.
- Numbers and booleans are coerced to string before the substring search.
- If no values are supplied, validation passes (no constraint to violate).
- For non-string control values, validation fails (the validator can't safely say "doesn't contain X" of a non-string).

## See also

- [`contains`](./contains) — opposite check
- [`doesntStartWith`](./doesnt-start-with) / [`doesntEndWith`](./doesnt-end-with) — anchored variants
