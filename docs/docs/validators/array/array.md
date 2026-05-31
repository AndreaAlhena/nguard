---
slug: /validators/array/array
---

# `array`

Validate that the value is a JavaScript **array** (`Array.isArray`).

## Signature

```ts
NguardValidators.Array.array: ValidatorFn
```

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    tags: new FormControl([], [NguardValidators.Array.array]),
});
```

## Template-driven forms

```html
<input ngModel name="tags" nguardArray />
```

## Error key

`{ array: true }`

## Notes

- `null`, `undefined`, objects and array-like values are rejected — only true arrays pass.

## See also

- [`minSize`](./min-size) — minimum item count
- [`distinct`](./distinct) — no duplicates
