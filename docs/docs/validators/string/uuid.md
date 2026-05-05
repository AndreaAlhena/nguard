# `uuid`

Validate that a string is a syntactically valid UUID (versions 1–5, per RFC 4122).

## Signature

```ts
NguardValidators.String.uuid: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const id = new FormControl('', [NguardValidators.String.uuid]);
```

## Template-driven forms

```html
<input ngModel name="id" nguardUuid />
```

## Error key

`{ uuid: true }`

## Notes

- Pattern (case-insensitive): `^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$`.
- Validates **shape**, including the version digit (1-5) and variant nibble (8, 9, a, or b).
- Empty strings fail.

## See also

- [`ulid`](./ulid) — alternative identifier format (Crockford base32)
- [`regex`](./regex) — for custom identifier shapes
