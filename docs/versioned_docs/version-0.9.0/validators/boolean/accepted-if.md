# `acceptedIf`

Conditional [`accepted`](./accepted): the value must be one of the accepted set **only when** a sibling field matches a trigger condition.

## Signature

```ts
NguardValidators.Boolean.acceptedIf(
    fieldKey: string,
    value?: primitive,
    isStrict?: boolean,
): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fieldKey` | `string` | — | The key of the sibling field whose value triggers the rule |
| `value` | `primitive` (optional) | `undefined` | If provided, the sibling must equal this value to trigger the rule |
| `isStrict` | `boolean` | `false` | If `true`, the equality check against `value` is strict (`===`) |

When the condition is not met any value passes — the rule only kicks in when the sibling matches.

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// 'agreedToProTerms' is required to be accepted whenever 'subscriptionTier' is 'pro'
new FormGroup({
    subscriptionTier: new FormControl(''),
    agreedToProTerms: new FormControl(false, [
        NguardValidators.Boolean.acceptedIf('subscriptionTier', 'pro'),
    ]),
});
```

## Template-driven forms

```html
<!-- Shorthand: required to be accepted when 'isPaid' is truthy -->
<input
    type="checkbox"
    ngModel
    name="agreedToTerms"
    [nguardAcceptedIf]="'isPaid'"
/>

<!-- Object form: required to be accepted when sibling equals a specific value -->
<input
    type="checkbox"
    ngModel
    name="agreedToProTerms"
    [nguardAcceptedIf]="{ fieldKey: 'subscriptionTier', value: 'pro' }"
/>
```

## Error key

`{ acceptedIf: true }`

## Notes

- The accepted set matches Laravel exactly: `true`, `'true'`, `1`, `'1'`, `'yes'`, `'on'`. Case-sensitive.
- When the trigger value is omitted, any truthy sibling value triggers the rule.
- When the control has no parent form group the rule never triggers and any value passes.

## See also

- [`accepted`](./accepted) — unconditional acceptance
- [`declinedIf`](./declined-if) — opposite intent
