# `accepted`

Validate that the value is one of the **accepted** values (Laravel parity). Useful for terms-of-service checkboxes, opt-ins and "I agree" controls that may be backed by a string toggle, a numeric toggle or a boolean.

## Signature

```ts
NguardValidators.Boolean.accepted: ValidatorFn
```

| Accepted input | Notes |
|---|---|
| `true` | native boolean |
| `'true'` | stringified boolean |
| `1` | numeric truth |
| `'1'` | stringified numeric truth |
| `'yes'` | lowercase string |
| `'on'` | lowercase string (matches checkbox HTML) |

The check is **case-sensitive** — `'Yes'` and `'YES'` are not accepted. Anything outside the list above fails.

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    agreedToTerms: new FormControl(false, [NguardValidators.Boolean.accepted]),
});
```

## Template-driven forms

```html
<input type="checkbox" ngModel name="agreedToTerms" nguardAccepted />
```

## Error key

`{ accepted: true }`

## Notes

- Match Laravel's `accepted` rule exactly. If you need looser semantics (e.g. accept any truthy JS value), use [`truthy`](./truthy).
- Pair with [`acceptedIf`](./accepted-if) when the requirement is conditional on a sibling field.

## See also

- [`acceptedIf`](./accepted-if) — conditional variant
- [`declined`](./declined) — opposite check
- [`boolean`](./boolean) — strict boolean-like type check
- [`truthy`](./truthy) — any JS truthy value
