# `longerOrEqualTo`

Validate that a string is at least as long as another field's string.

## Signature

```ts
NguardValidators.String.longerOrEqualTo(fieldKey: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKey` | `string` | The key of the sibling field whose length is the target |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'nguard';

const form = new FormGroup({
    minPassword: new FormControl(''),
    password: new FormControl('', [
        NguardValidators.String.longerOrEqualTo('minPassword'),
    ]),
});
```

## Template-driven forms

```html
<input ngModel name="minPassword" />
<input ngModel name="password" [nguardLongerOrEqualTo]="'minPassword'" />
```

## Error key

`{ longerOrEqualTo: true }`

## Notes

- The check is `>=` (inclusive). Equal lengths pass.
- Both fields must be strings — non-string siblings cause failure.
- If the control has no parent form group, the validator fails.

## See also

- [`longerThan`](./longer-than) — strict variant
- [`shorterOrEqualTo`](./shorter-or-equal-to) — opposite direction
- [`minLength`](./min-length) — same operator but compares to a literal length
