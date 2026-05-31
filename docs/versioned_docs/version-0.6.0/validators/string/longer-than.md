# `longerThan`

Validate that a string is strictly longer than another field's string.

## Signature

```ts
NguardValidators.String.longerThan(fieldKey: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKey` | `string` | The key of the sibling field whose length is the target |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    password: new FormControl(''),
    fullPassword: new FormControl('', [
        NguardValidators.String.longerThan('password'),
    ]),
});
```

## Template-driven forms

```html
<input ngModel name="password" />
<input ngModel name="fullPassword" [nguardLongerThan]="'password'" />
```

## Error key

`{ longerThan: true }`

## Notes

- The check is strict (`>`). Equal lengths fail.
- Both fields must be strings — non-string siblings cause failure.
- If the control has no parent form group, the validator fails.

## See also

- [`longerOrEqualTo`](./longer-or-equal-to) — inclusive variant
- [`shorterThan`](./shorter-than) — opposite direction
- [`minLength`](./min-length) — same operator but compares to a literal length
