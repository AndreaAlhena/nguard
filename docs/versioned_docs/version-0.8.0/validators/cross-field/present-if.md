# `presentIf`

The field's value must be **present** (not `null` and not `undefined`) when a sibling field matches a trigger condition. Empty string, `0` and `false` count as present.

## Signature

```ts
NguardValidators.CrossField.presentIf(
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

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// 'taxId' must have a value (even empty string) when 'isBusiness' is truthy
new FormGroup({
    isBusiness: new FormControl(false),
    taxId: new FormControl(null, [
        NguardValidators.CrossField.presentIf('isBusiness'),
    ]),
});

// 'state' must be present when 'country' is exactly 'US'
new FormGroup({
    country: new FormControl(''),
    state: new FormControl(null, [
        NguardValidators.CrossField.presentIf('country', 'US'),
    ]),
});
```

## Template-driven forms

```html
<!-- Shorthand: present if 'isBusiness' is truthy -->
<input ngModel name="taxId" [nguardPresentIf]="'isBusiness'" />

<!-- Object form: present if sibling equals a specific value -->
<input
    ngModel
    name="state"
    [nguardPresentIf]="{ fieldKey: 'country', value: 'US' }"
/>
```

## Error key

`{ presentIf: true }`

## Notes

- "Present" means the value is anything other than `null` or `undefined`. Empty string, `0` and `false` all count as present — use [`requiredIf`](./required-if) when you need a truthy value.
- When the trigger value is omitted, any truthy sibling value triggers the rule.
- When the control has no parent form group the rule never triggers and the field can be `null`.

## See also

- [`presentUnless`](./present-unless) — opposite direction
- [`requiredIf`](./required-if) — stricter check (value must be truthy)
