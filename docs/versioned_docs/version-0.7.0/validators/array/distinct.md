---
slug: /validators/array/distinct
---

# `distinct`

Validate that the array has **no duplicate values**. A non-array value fails.

## Signature

```ts
NguardValidators.Array.distinct: ValidatorFn
```

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl([1, 2, 3], [NguardValidators.Array.distinct]);
```

## Template-driven forms

```html
<input ngModel name="tags" nguardDistinct />
```

## Error key

`{ distinct: true }`

## Notes

- Uniqueness is determined with `Set` value-equality: **primitives** are compared by value, **objects** by reference. Two structurally-equal objects are therefore treated as distinct.
- A non-array value (including `null`/`undefined`) fails.

## See also

- [`array`](./array) — value is an array
- [`contains`](./contains) — required members
