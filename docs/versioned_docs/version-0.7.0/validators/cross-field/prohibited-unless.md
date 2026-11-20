# `prohibitedUnless`

The field's value must be **empty** (falsy) **unless** a sibling field matches a trigger condition.

## Signature

```ts
NguardValidators.CrossField.prohibitedUnless(
    fieldKey: string,
    value?: primitive,
    isStrict?: boolean,
): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fieldKey` | `string` | — | The key of the sibling field whose value bypasses the prohibition |
| `value` | `primitive` (optional) | `undefined` | If provided, the sibling must equal this value to bypass the rule |
| `isStrict` | `boolean` | `false` | If `true`, the equality check against `value` is strict (`===`) |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// 'inviteCode' is allowed only when 'role' is 'admin' — empty otherwise
new FormGroup({
    role: new FormControl(''),
    inviteCode: new FormControl('', [
        NguardValidators.CrossField.prohibitedUnless('role', 'admin'),
    ]),
});
```

## Template-driven forms

```html
<!-- Shorthand: empty unless 'isAdmin' is truthy -->
<input ngModel name="inviteCode" [nguardProhibitedUnless]="'isAdmin'" />

<!-- Object form: empty unless sibling equals a specific value -->
<input
    ngModel
    name="inviteCode"
    [nguardProhibitedUnless]="{ fieldKey: 'role', value: 'admin' }"
/>
```

## Error key

`{ prohibitedUnless: true }`

## Notes

- "Empty" means the value is falsy (empty string, `0`, `false`, `null`, `undefined`).
- When the trigger value is omitted, any truthy sibling value bypasses the prohibition.
- When the control has no parent form group the rule applies and the field's value must be empty.

## See also

- [`prohibitedIf`](./prohibited-if) — opposite direction
- [`requiredUnless`](./required-unless) — inverse intent (must be filled unless condition met)
