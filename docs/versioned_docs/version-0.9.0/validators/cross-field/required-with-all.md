# `requiredWithAll`

The field is required only when **every** listed sibling field is filled.

## Signature

```ts
NguardValidators.CrossField.requiredWithAll(...fieldKeys: string[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKeys` | `...string` | One or more sibling keys. The rule applies only when all of them are filled |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// 'displayName' is required only when both 'firstName' and 'lastName' are filled
new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    displayName: new FormControl('', [
        NguardValidators.CrossField.requiredWithAll('firstName', 'lastName'),
    ]),
});
```

## Template-driven forms

```html
<!-- Single sibling -->
<input ngModel name="displayName" [nguardRequiredWithAll]="'firstName'" />

<!-- Multiple siblings -->
<input
    ngModel
    name="displayName"
    [nguardRequiredWithAll]="['firstName', 'lastName']"
/>
```

## Error key

`{ requiredWithAll: true }`

## Notes

- "Filled" means the sibling's value is truthy (non-empty string, non-zero number, non-`null`/`undefined`).
- The rule triggers only when **every** listed sibling is filled — for the any-must-be-filled variant see [`requiredWith`](./required-with).
- When the control has no parent form group, no sibling is reachable so the rule never triggers and the field can be empty.

## See also

- [`requiredWith`](./required-with) — any sibling must be filled
- [`requiredWithoutAll`](./required-without-all) — every sibling must be missing
