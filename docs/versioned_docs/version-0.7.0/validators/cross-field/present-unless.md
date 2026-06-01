# `presentUnless`

The field's value must be **present** (not `null` and not `undefined`) **unless** a sibling field matches a trigger condition. Empty string, `0` and `false` count as present.

## Signature

```ts
NguardValidators.CrossField.presentUnless(
    fieldKey: string,
    value?: primitive,
    isStrict?: boolean,
): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fieldKey` | `string` | — | The key of the sibling field whose value bypasses the rule |
| `value` | `primitive` (optional) | `undefined` | If provided, the sibling must equal this value to bypass the rule |
| `isStrict` | `boolean` | `false` | If `true`, the equality check against `value` is strict (`===`) |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// 'phone' must have a value (even empty string) unless 'preferEmailOnly' is truthy
new FormGroup({
    preferEmailOnly: new FormControl(false),
    phone: new FormControl(null, [
        NguardValidators.CrossField.presentUnless('preferEmailOnly'),
    ]),
});
```

## Template-driven forms

```html
<!-- Shorthand: present unless 'preferEmailOnly' is truthy -->
<input ngModel name="phone" [nguardPresentUnless]="'preferEmailOnly'" />

<!-- Object form: present unless sibling equals a specific value -->
<input
    ngModel
    name="phone"
    [nguardPresentUnless]="{ fieldKey: 'contactMethod', value: 'email' }"
/>
```

## Error key

`{ presentUnless: true }`

## Notes

- "Present" means the value is anything other than `null` or `undefined`. Empty string, `0` and `false` all count as present — use [`requiredUnless`](./required-unless) when you need a truthy value.
- When the trigger value is omitted, any truthy sibling value bypasses the rule.
- When the control has no parent form group the rule applies and the field's value must not be `null` / `undefined`.

## See also

- [`presentIf`](./present-if) — opposite direction
- [`requiredUnless`](./required-unless) — stricter check (value must be truthy)
