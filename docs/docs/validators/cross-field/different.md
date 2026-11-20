---
sidebar_position: 2
---

# `different`

Validate that the field does **not** equal a sibling field's value.

## Signature

```ts
NguardValidators.CrossField.different(
    fieldKey: string,
    isStrict?: boolean,
): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fieldKey` | `string` | — | The key of the sibling field |
| `isStrict` | `boolean` | `false` | If `true`, comparison uses `===` (strict). If `false`, `==` (loose, type coercion applies) |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    oldEmail: new FormControl('user@old.com'),
    newEmail: new FormControl('', [
        NguardValidators.CrossField.different('oldEmail'),
    ]),
});

// Strict comparison (won't treat '1' and 1 as equal)
const strict = NguardValidators.CrossField.different('oldEmail', true);
```

## Template-driven forms

```html
<!-- Shorthand: pass the field key directly -->
<input ngModel name="newEmail" [nguardDifferent]="'oldEmail'" />

<!-- Object form: include strict mode -->
<input
    ngModel
    name="newEmail"
    [nguardDifferent]="{ fieldKey: 'oldEmail', isStrict: true }"
/>
```

## Error key

`{ different: true }`

## Notes

- With `isStrict: false` (default), `'1'` and `1` are considered equal — so a numeric `1` against string `'1'` fails this validator.
- With `isStrict: true`, the same case passes (`'1' !== 1`).
- If the control has no parent form group or the sibling has `null` / `undefined`, the validator passes (current value is "different" by definition).

## See also

- [`same`](./same) — opposite check
- [`confirmed`](./confirmed) — strict equality only, conventional naming for password-confirmation
