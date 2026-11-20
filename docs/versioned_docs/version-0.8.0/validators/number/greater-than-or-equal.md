---
sidebar_position: 11
---

# `greaterThanOrEqual`

Validate that a numeric value is greater than or equal to another field's numeric value.

## Signature

```ts
NguardValidators.Number.greaterThanOrEqual(fieldKey: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKey` | `string` | The key of the sibling field to compare against |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const range = new FormGroup({
    floor: new FormControl(0),
    ceiling: new FormControl(0, [
        NguardValidators.Number.greaterThanOrEqual('floor'),
    ]),
});
```

## Template-driven forms

```html
<input ngModel name="floor" type="number" />
<input ngModel name="ceiling" type="number" [nguardGreaterThanOrEqual]="'floor'" />
```

## Error key

`{ greaterThanOrEqual: true }`

## Notes

- The check is `>=` (inclusive). Equal values pass.
- Both fields must be numeric — non-numeric inputs (including a non-numeric sibling) cause failure.
- If the control has no parent form group, the validator fails.
- Numeric strings are accepted on both sides.

## See also

- [`greaterThan`](./greater-than) — strict variant
- [`lesserThanOrEqual`](./lesser-than-or-equal) — opposite direction
- [`min`](./min) — same operator but compares to a literal, not a sibling
