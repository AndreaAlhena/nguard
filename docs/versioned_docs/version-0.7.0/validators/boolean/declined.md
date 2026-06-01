# `declined`

Validate that the value is one of the **declined** values (Laravel parity). The mirror of [`accepted`](./accepted) — useful for opt-out toggles or "I do not agree" controls.

## Signature

```ts
NguardValidators.Boolean.declined: ValidatorFn
```

| Accepted input | Notes |
|---|---|
| `false` | native boolean |
| `'false'` | stringified boolean |
| `0` | numeric false |
| `'0'` | stringified numeric false |
| `'no'` | lowercase string |
| `'off'` | lowercase string (matches checkbox HTML) |

The check is **case-sensitive** — `'No'` and `'OFF'` are not accepted. Anything outside the list above fails.

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    optedOut: new FormControl(false, [NguardValidators.Boolean.declined]),
});
```

## Template-driven forms

```html
<input type="checkbox" ngModel name="optedOut" nguardDeclined />
```

## Error key

`{ declined: true }`

## Notes

- Match Laravel's `declined` rule exactly. If you need looser semantics (e.g. accept any falsy JS value), use [`falsy`](./falsy).
- Pair with [`declinedIf`](./declined-if) when the requirement is conditional on a sibling field.

## See also

- [`declinedIf`](./declined-if) — conditional variant
- [`accepted`](./accepted) — opposite check
- [`boolean`](./boolean) — strict boolean-like type check
- [`falsy`](./falsy) — any JS falsy value
