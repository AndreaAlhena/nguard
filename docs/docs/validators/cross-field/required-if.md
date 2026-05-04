---
sidebar_position: 3
---

# `requiredIf`

The field is required when a sibling field is set, optionally only when the sibling matches a specific value.

## Signature

```ts
NguardValidators.CrossField.requiredIf(
    fieldKey: string,
    value?: primitive,
    isStrict?: boolean,
): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fieldKey` | `string` | — | The key of the sibling field whose value triggers the requirement |
| `value` | `primitive` (optional) | `undefined` | If provided, the sibling must equal this value to trigger the requirement |
| `isStrict` | `boolean` | `false` | If `true`, the equality check against `value` is strict (`===`) |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'nguard';

// Required whenever 'paymentMethod' is set to anything truthy
new FormGroup({
    paymentMethod: new FormControl(''),
    cardNumber: new FormControl('', [
        NguardValidators.CrossField.requiredIf('paymentMethod'),
    ]),
});

// Required only when 'paymentMethod' is exactly 'creditCard'
new FormGroup({
    paymentMethod: new FormControl(''),
    cardNumber: new FormControl('', [
        NguardValidators.CrossField.requiredIf('paymentMethod', 'creditCard'),
    ]),
});

// Strict equality against a numeric trigger
new FormGroup({
    accountType: new FormControl(''),
    companyName: new FormControl('', [
        NguardValidators.CrossField.requiredIf('accountType', 1, true),
    ]),
});
```

## Template-driven forms

```html
<!-- Shorthand: required if 'paymentMethod' is truthy -->
<input ngModel name="cardNumber" [nguardRequiredIf]="'paymentMethod'" />

<!-- Object form: required if sibling equals a specific value -->
<input
    ngModel
    name="cardNumber"
    [nguardRequiredIf]="{ fieldKey: 'paymentMethod', value: 'creditCard' }"
/>

<!-- Strict equality against a numeric value -->
<input
    ngModel
    name="companyName"
    [nguardRequiredIf]="{ fieldKey: 'accountType', value: 1, isStrict: true }"
/>
```

## Error key

`{ requiredIf: true }`

## Notes

- "Required" here means the field's value must be truthy after type coercion (non-empty string, non-zero number, non-`null`/`undefined`).
- When the trigger value is omitted, any truthy sibling value triggers the requirement.
- When the trigger value is provided and `isStrict: false` (default), `==` is used — `'1'` matches `1`.
- When the sibling has no value (or its parent form group doesn't exist), the requirement is not triggered, so the field can be empty.

## See also

- v0.5.0 conditional siblings: `requiredUnless`, `requiredWith`, `requiredWithout`, `prohibitedIf` (planned)
