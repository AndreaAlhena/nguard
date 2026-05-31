# `requiredWithout`

The field is required when **any** of the listed sibling fields is missing.

## Signature

```ts
NguardValidators.CrossField.requiredWithout(...fieldKeys: string[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKeys` | `...string` | One or more sibling keys. The rule applies as soon as one of them is empty |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// 'phone' is required when either 'email' or 'fax' is empty
new FormGroup({
    email: new FormControl(''),
    fax: new FormControl(''),
    phone: new FormControl('', [
        NguardValidators.CrossField.requiredWithout('email', 'fax'),
    ]),
});
```

## Template-driven forms

```html
<!-- Single sibling -->
<input ngModel name="phone" [nguardRequiredWithout]="'email'" />

<!-- Multiple siblings -->
<input
    ngModel
    name="phone"
    [nguardRequiredWithout]="['email', 'fax']"
/>
```

## Error key

`{ requiredWithout: true }`

## Notes

- "Missing" means the sibling's value is falsy (empty string, `0`, `null`, `undefined`).
- The rule triggers when **any** of the listed siblings is missing — for the all-must-be-missing variant see [`requiredWithoutAll`](./required-without-all).
- When the control has no parent form group, every sibling is unreachable and treated as missing — the rule fires and the field's value must be truthy.

## See also

- [`requiredWith`](./required-with) — opposite check
- [`requiredWithAll`](./required-with-all) — every sibling must be filled
- [`requiredWithoutAll`](./required-without-all) — every sibling must be missing
