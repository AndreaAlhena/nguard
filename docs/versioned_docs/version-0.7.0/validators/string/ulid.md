# `ulid`

Validate that a string is a syntactically valid ULID — 26 characters in Crockford base32 (excludes `I`, `L`, `O`, `U`).

## Signature

```ts
NguardValidators.String.ulid: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const id = new FormControl('', [NguardValidators.String.ulid]);
```

## Template-driven forms

```html
<input ngModel name="id" nguardUlid />
```

## Error key

`{ ulid: true }`

## Notes

- Validates **shape**, not chronological monotonicity or generator integrity.
- Pattern (case-insensitive): `^[0-9A-HJKMNP-TV-Z]{26}$`.
- Empty strings fail.

## See also

- [`uuid`](./uuid) — alternative identifier format (RFC 4122)
- [`regex`](./regex) — for custom identifier shapes
