# `requiredWith`

The field is required when **any** of the listed sibling fields is filled.

## Signature

```ts
NguardValidators.CrossField.requiredWith(...fieldKeys: string[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKeys` | `...string` | One or more sibling keys. The rule applies as soon as one of them is filled |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// 'cardNumber' is required as soon as either 'billingAddress' or 'phone' is filled
new FormGroup({
    billingAddress: new FormControl(''),
    phone: new FormControl(''),
    cardNumber: new FormControl('', [
        NguardValidators.CrossField.requiredWith('billingAddress', 'phone'),
    ]),
});
```

## Template-driven forms

```html
<!-- Single sibling -->
<input ngModel name="cardNumber" [nguardRequiredWith]="'phone'" />

<!-- Multiple siblings -->
<input
    ngModel
    name="cardNumber"
    [nguardRequiredWith]="['billingAddress', 'phone']"
/>
```

## Error key

`{ requiredWith: true }`

## Notes

- "Filled" means the sibling's value is truthy (non-empty string, non-zero number, non-`null`/`undefined`).
- The rule triggers when **any** of the listed siblings is filled — for the all-must-be-filled variant see [`requiredWithAll`](./required-with-all).
- When the control has no parent form group, no sibling is reachable so the rule never triggers and the field can be empty.

## See also

- [`requiredWithout`](./required-without) — opposite check
- [`requiredWithAll`](./required-with-all) — every sibling must be filled
- [`requiredWithoutAll`](./required-without-all) — every sibling must be missing
