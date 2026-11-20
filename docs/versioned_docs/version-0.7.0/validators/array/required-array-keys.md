# `requiredArrayKeys`

Validate that the value is a **non-null object containing every one of the given keys**. Maps Laravel's `required_array_keys` rule to a plain object.

## Signature

```ts
NguardValidators.Array.requiredArrayKeys(...keys: string[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...keys` | `string[]` | The keys that must all be present |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl({ id: 1, name: 'x' }, [
    NguardValidators.Array.requiredArrayKeys('id', 'name'),
]);
```

## Template-driven forms

```html
<!-- Array form -->
<input ngModel name="profile" [nguardRequiredArrayKeys]="['id', 'name']" />

<!-- Single key shorthand -->
<input ngModel name="profile" [nguardRequiredArrayKeys]="'id'" />
```

## Error key

`{ requiredArrayKeys: true }`

## Notes

- Presence is checked with the `in` operator, so inherited keys count.
- `null`, `undefined` and primitives fail — the value must be an object.

## See also

- [`array`](./array) — value is an array
