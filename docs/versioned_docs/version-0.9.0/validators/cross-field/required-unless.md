# `requiredUnless`

The field is required **unless** a sibling field matches a trigger condition. The complement of [`requiredIf`](./required-if).

## Signature

```ts
NguardValidators.CrossField.requiredUnless(
    fieldKey: string,
    value?: primitive,
    isStrict?: boolean,
): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fieldKey` | `string` | — | The key of the sibling field whose value bypasses the requirement |
| `value` | `primitive` (optional) | `undefined` | If provided, the sibling must equal this value to bypass the requirement |
| `isStrict` | `boolean` | `false` | If `true`, the equality check against `value` is strict (`===`) |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// 'state' is required unless 'country' is set to 'US'
new FormGroup({
    country: new FormControl(''),
    state: new FormControl('', [
        NguardValidators.CrossField.requiredUnless('country', 'US'),
    ]),
});

// 'reason' is required unless 'agreedToTerms' is truthy
new FormGroup({
    agreedToTerms: new FormControl(false),
    reason: new FormControl('', [
        NguardValidators.CrossField.requiredUnless('agreedToTerms'),
    ]),
});
```

## Template-driven forms

```html
<!-- Shorthand: required unless 'agreedToTerms' is truthy -->
<input ngModel name="reason" [nguardRequiredUnless]="'agreedToTerms'" />

<!-- Object form: required unless sibling equals a specific value -->
<input
    ngModel
    name="state"
    [nguardRequiredUnless]="{ fieldKey: 'country', value: 'US' }"
/>

<!-- Strict equality against a numeric value -->
<input
    ngModel
    name="taxId"
    [nguardRequiredUnless]="{ fieldKey: 'accountType', value: 1, isStrict: true }"
/>
```

## Error key

`{ requiredUnless: true }`

## Notes

- The rule is bypassed when the sibling matches the trigger; in that case any value — including empty — passes.
- When the trigger value is omitted, any truthy sibling value bypasses the rule.
- When the trigger is provided and `isStrict: false` (default), `==` is used — `'1'` matches `1`.
- When the control has no parent form group, the sibling is unreachable so the rule applies and the field's value must be truthy.

## See also

- [`requiredIf`](./required-if) — opposite direction
