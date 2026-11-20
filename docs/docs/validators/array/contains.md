# `contains`

Validate that the array contains **every** one of the given values (membership via `Array.includes`). A non-array value fails.

## Signature

```ts
NguardValidators.Array.contains(...values: primitive[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `primitive[]` | The values that must all be present |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl(['read', 'write'], [NguardValidators.Array.contains('read', 'write')]);
```

## Template-driven forms

```html
<!-- Array form -->
<input ngModel name="scopes" [nguardArrayContains]="['read', 'write']" />

<!-- Single value shorthand -->
<input ngModel name="scopes" [nguardArrayContains]="'read'" />
```

The directive selector is `nguardArrayContains` (prefixed to avoid clashing with the `String.contains` directive).

## Error key

`{ contains: true }`

## Notes

- Membership uses `Array.prototype.includes` (strict, `SameValueZero`).
- A non-array value (including `null`/`undefined`) fails.

## See also

- [`doesntContain`](./doesnt-contain) — forbidden members
- [`inArray`](./in-array) — value is a member of a sibling's array
