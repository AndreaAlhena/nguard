---
sidebar_position: 1
---

# `confirmed`

Validate that the field equals a sibling field (typically used for "confirm password" patterns).

## Signature

```ts
NguardValidators.CrossField.confirmed(fieldKey: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKey` | `string` | The key of the sibling field whose value the current field must match |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'nguard';

const form = new FormGroup({
    password: new FormControl(''),
    passwordConfirm: new FormControl('', [
        NguardValidators.CrossField.confirmed('password'),
    ]),
});
```

## Template-driven forms

```html
<input ngModel name="password" type="password" />
<input ngModel name="passwordConfirm" type="password" [nguardConfirmed]="'password'" />
```

## Error key

`{ confirmed: true }`

## Notes

- The check is **strict** (`===`); type coercion is not applied. `'1'` and `1` are not considered equal.
- If the control has no parent form group, the validator fails (the sibling can't be looked up).
- If the sibling field is `null` or `undefined`, the validator fails — even if the current field is also empty. Use `Validators.required` separately if you want to allow both fields empty.
- Empty strings on both sides are considered equal and pass validation.

## See also

- [`same`](./same) — same equality logic but configurable strict/loose mode
- [`different`](./different) — opposite check
