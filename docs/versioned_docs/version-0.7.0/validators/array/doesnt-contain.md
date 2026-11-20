# `doesntContain`

Validate that the array contains **none** of the given values (membership via `Array.includes`). A non-array value fails.

## Signature

```ts
NguardValidators.Array.doesntContain(...values: primitive[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `primitive[]` | The values that must all be absent |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl(['read'], [NguardValidators.Array.doesntContain('admin', 'root')]);
```

## Template-driven forms

```html
<!-- Array form -->
<input ngModel name="scopes" [nguardArrayDoesntContain]="['admin', 'root']" />

<!-- Single value shorthand -->
<input ngModel name="scopes" [nguardArrayDoesntContain]="'admin'" />
```

The directive selector is `nguardArrayDoesntContain` (prefixed for symmetry with `nguardArrayContains`).

## Error key

`{ doesntContain: true }`

## Notes

- Membership uses `Array.prototype.includes` (strict, `SameValueZero`).
- A non-array value (including `null`/`undefined`) fails.

## See also

- [`contains`](./contains) — required members
