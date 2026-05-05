---
sidebar_position: 13
---

# `lesserThanOrEqual`

Validate that a numeric value is less than or equal to another field's numeric value.

## Signature

```ts
NguardValidators.Number.lesserThanOrEqual(fieldKey: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKey` | `string` | The key of the sibling field to compare against |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'nguard';

const range = new FormGroup({
    ceiling: new FormControl(0),
    floor: new FormControl(0, [
        NguardValidators.Number.lesserThanOrEqual('ceiling'),
    ]),
});
```

## Template-driven forms

```html
<input ngModel name="ceiling" type="number" />
<input ngModel name="floor" type="number" [nguardLesserThanOrEqual]="'ceiling'" />
```

## Error key

`{ lesserThanOrEqual: true }`

## Notes

- The check is `<=` (inclusive). Equal values pass.
- Both fields must be numeric — non-numeric inputs (including a non-numeric sibling) cause failure.
- If the control has no parent form group, the validator fails.
- Numeric strings are accepted on both sides.

## See also

- [`lesserThan`](./lesser-than) — strict variant
- [`greaterThanOrEqual`](./greater-than-or-equal) — opposite direction
- [`max`](./max) — same operator but compares to a literal, not a sibling
