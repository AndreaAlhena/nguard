---
sidebar_position: 10
---

# `greaterThan`

Validate that a numeric value is strictly greater than another field's numeric value.

## Signature

```ts
NguardValidators.Number.greaterThan(fieldKey: string): ValidatorFn
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
        NguardValidators.Number.greaterThan('floor'),
    ]),
});
```

## Template-driven forms

```html
<input ngModel name="floor" type="number" />
<input ngModel name="ceiling" type="number" [nguardGreaterThan]="'floor'" />
```

## Error key

`{ greaterThan: true }`

## Notes

- The check is **strict** (`>`). Equal values fail.
- Both fields must be numeric — non-numeric inputs (including a non-numeric sibling) cause failure.
- If the control has no parent form group, the validator fails.
- Numeric strings are accepted on both sides.

## See also

- [`greaterThanOrEqual`](./greater-than-or-equal) — inclusive variant
- [`lesserThan`](./lesser-than) — opposite direction
- [`min`](./min) — same operator but compares to a literal, not a sibling
