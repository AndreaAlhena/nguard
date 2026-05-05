---
sidebar_position: 12
---

# `lesserThan`

Validate that a numeric value is strictly less than another field's numeric value.

## Signature

```ts
NguardValidators.Number.lesserThan(fieldKey: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKey` | `string` | The key of the sibling field to compare against |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const range = new FormGroup({
    ceiling: new FormControl(0),
    floor: new FormControl(0, [
        NguardValidators.Number.lesserThan('ceiling'),
    ]),
});
```

## Template-driven forms

```html
<input ngModel name="ceiling" type="number" />
<input ngModel name="floor" type="number" [nguardLesserThan]="'ceiling'" />
```

## Error key

`{ lesserThan: true }`

## Notes

- The check is **strict** (`<`). Equal values fail.
- Both fields must be numeric — non-numeric inputs (including a non-numeric sibling) cause failure.
- If the control has no parent form group, the validator fails.
- Numeric strings are accepted on both sides.

## See also

- [`lesserThanOrEqual`](./lesser-than-or-equal) — inclusive variant
- [`greaterThan`](./greater-than) — opposite direction
- [`max`](./max) — same operator but compares to a literal, not a sibling
