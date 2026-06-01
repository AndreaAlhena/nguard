# `prohibitedIf`

The field's value must be **empty** (falsy) when a sibling field matches a trigger condition.

## Signature

```ts
NguardValidators.CrossField.prohibitedIf(
    fieldKey: string,
    value?: primitive,
    isStrict?: boolean,
): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fieldKey` | `string` | — | The key of the sibling field whose value triggers the prohibition |
| `value` | `primitive` (optional) | `undefined` | If provided, the sibling must equal this value to trigger the rule |
| `isStrict` | `boolean` | `false` | If `true`, the equality check against `value` is strict (`===`) |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// 'displayName' must be empty when 'isAnonymous' is truthy
new FormGroup({
    isAnonymous: new FormControl(false),
    displayName: new FormControl('', [
        NguardValidators.CrossField.prohibitedIf('isAnonymous'),
    ]),
});

// 'inviteCode' is forbidden when 'role' is exactly 'admin'
new FormGroup({
    role: new FormControl(''),
    inviteCode: new FormControl('', [
        NguardValidators.CrossField.prohibitedIf('role', 'admin'),
    ]),
});
```

## Template-driven forms

```html
<!-- Shorthand: prohibited if 'isAnonymous' is truthy -->
<input ngModel name="displayName" [nguardProhibitedIf]="'isAnonymous'" />

<!-- Object form: prohibited if sibling equals a specific value -->
<input
    ngModel
    name="inviteCode"
    [nguardProhibitedIf]="{ fieldKey: 'role', value: 'admin' }"
/>
```

## Error key

`{ prohibitedIf: true }`

## Notes

- "Empty" means the value is falsy (empty string, `0`, `false`, `null`, `undefined`).
- When the trigger value is omitted, any truthy sibling value triggers the prohibition.
- When the control has no parent form group the rule never triggers and any value is accepted.

## See also

- [`prohibitedUnless`](./prohibited-unless) — opposite direction
- [`requiredIf`](./required-if) — inverse intent (must be filled when condition met)
