# `arrayOf`

Validate that **every item** in the array passes the supplied validator. A non-array value fails.

## Signature

```ts
NguardValidators.Array.arrayOf(validator: ValidatorFn): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `validator` | `ValidatorFn` | The validator applied to each item |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// Every item must be a valid email
new FormControl(['a@b.com', 'c@d.com'], [
    NguardValidators.Array.arrayOf(NguardValidators.String.email),
]);
```

## Template-driven forms

```html
<!-- bind a component property holding the per-item validator -->
<input ngModel name="emails" [nguardArrayOf]="itemValidator" />
```

```ts
import { NguardValidators } from 'ng-nguard';

class MyComponent {
    public readonly itemValidator = NguardValidators.String.email;
}
```

## Error key

`{ arrayOf: true }`

## Notes

- Each item is wrapped in a transient `FormControl` before being handed to the validator, so only **self-contained** item validators are supported — cross-field item rules (those reading a sibling) will not work.
- An empty array passes. A non-array value fails.

## See also

- [`array`](./array) — value is an array
- [`distinct`](./distinct) — no duplicates
