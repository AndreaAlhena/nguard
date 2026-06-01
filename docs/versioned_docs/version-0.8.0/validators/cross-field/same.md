---
sidebar_position: 4
---

# `same`

Validate that the field equals a sibling field's value.

## Signature

```ts
NguardValidators.CrossField.same(
    fieldKey: string,
    isStrict?: boolean,
): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fieldKey` | `string` | — | The key of the sibling field |
| `isStrict` | `boolean` | `false` | If `true`, comparison uses `===`. If `false`, `==` (type coercion applies) |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    sourceField: new FormControl(''),
    mirrorField: new FormControl('', [
        NguardValidators.CrossField.same('sourceField'),
    ]),
});

// Strict mode — useful when type matters
const strict = NguardValidators.CrossField.same('sourceField', true);
```

## Template-driven forms

```html
<!-- Shorthand: pass the field key directly -->
<input ngModel name="mirrorField" [nguardSame]="'sourceField'" />

<!-- Object form: include strict mode -->
<input
    ngModel
    name="mirrorField"
    [nguardSame]="{ fieldKey: 'sourceField', isStrict: true }"
/>
```

## Error key

`{ same: true }`

## Notes

- With `isStrict: false` (default), `'1'` and `1` are considered equal.
- With `isStrict: true`, the same case fails.
- If the control has no parent form group or the sibling is `null` / `undefined`, the validator fails.
- Empty strings on both sides are considered equal.

## When to choose `same` vs. `confirmed`

| Validator | Equality mode | Naming convention |
|---|---|---|
| `confirmed` | Always strict | Designed for `field` ↔ `field_confirmation` patterns |
| `same` | Configurable (default loose) | General-purpose; the sibling key can be anything |

For password confirmation specifically, `confirmed` reads more naturally. For everything else, `same` is more flexible.

## See also

- [`different`](./different) — opposite check
- [`confirmed`](./confirmed) — strict equality only, naming-convention-friendly
