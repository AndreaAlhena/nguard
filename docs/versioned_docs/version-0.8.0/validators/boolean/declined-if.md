# `declinedIf`

Conditional [`declined`](./declined): the value must be one of the declined set **only when** a sibling field matches a trigger condition.

## Signature

```ts
NguardValidators.Boolean.declinedIf(
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

// 'wantsMarketingEmails' must be declined when 'role' is 'guest'
new FormGroup({
    role: new FormControl(''),
    wantsMarketingEmails: new FormControl(true, [
        NguardValidators.Boolean.declinedIf('role', 'guest'),
    ]),
});
```

## Template-driven forms

```html
<!-- Shorthand: must be declined when 'isReadOnlyMode' is truthy -->
<input
    type="checkbox"
    ngModel
    name="allowEdits"
    [nguardDeclinedIf]="'isReadOnlyMode'"
/>

<!-- Object form: must be declined when sibling equals a specific value -->
<input
    type="checkbox"
    ngModel
    name="wantsMarketingEmails"
    [nguardDeclinedIf]="{ fieldKey: 'role', value: 'guest' }"
/>
```

## Error key

`{ declinedIf: true }`

## Notes

- The declined set matches Laravel exactly: `false`, `'false'`, `0`, `'0'`, `'no'`, `'off'`. Case-sensitive.
- When the trigger value is omitted, any truthy sibling value triggers the rule.
- When the control has no parent form group the rule never triggers and any value passes.

## See also

- [`declined`](./declined) — unconditional decline
- [`acceptedIf`](./accepted-if) — opposite intent
