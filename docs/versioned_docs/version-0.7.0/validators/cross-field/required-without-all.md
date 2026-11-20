# `requiredWithoutAll`

The field is required only when **every** listed sibling field is missing.

## Signature

```ts
NguardValidators.CrossField.requiredWithoutAll(...fieldKeys: string[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKeys` | `...string` | One or more sibling keys. The rule applies only when all of them are empty |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// 'fallbackContact' is required only when both 'email' and 'phone' are empty
new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    fallbackContact: new FormControl('', [
        NguardValidators.CrossField.requiredWithoutAll('email', 'phone'),
    ]),
});
```

## Template-driven forms

```html
<!-- Single sibling -->
<input ngModel name="fallbackContact" [nguardRequiredWithoutAll]="'email'" />

<!-- Multiple siblings -->
<input
    ngModel
    name="fallbackContact"
    [nguardRequiredWithoutAll]="['email', 'phone']"
/>
```

## Error key

`{ requiredWithoutAll: true }`

## Notes

- "Missing" means the sibling's value is falsy (empty string, `0`, `null`, `undefined`).
- The rule triggers only when **every** listed sibling is missing — for the any-must-be-missing variant see [`requiredWithout`](./required-without).
- When the control has no parent form group, every sibling is unreachable and treated as missing — the rule fires and the field's value must be truthy.

## See also

- [`requiredWithout`](./required-without) — any sibling must be missing
- [`requiredWithAll`](./required-with-all) — every sibling must be filled
