# `shorterOrEqualTo`

Validate that a string is at most as long as another field's string.

## Signature

```ts
NguardValidators.String.shorterOrEqualTo(fieldKey: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `fieldKey` | `string` | The key of the sibling field whose length is the target |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'nguard';

const form = new FormGroup({
    fullName: new FormControl(''),
    abbreviation: new FormControl('', [
        NguardValidators.String.shorterOrEqualTo('fullName'),
    ]),
});
```

## Template-driven forms

```html
<input ngModel name="fullName" />
<input ngModel name="abbreviation" [nguardShorterOrEqualTo]="'fullName'" />
```

## Error key

`{ shorterOrEqualTo: true }`

## Notes

- The check is `<=` (inclusive). Equal lengths pass.
- Both fields must be strings — non-string siblings cause failure.
- If the control has no parent form group, the validator fails.

## See also

- [`shorterThan`](./shorter-than) — strict variant
- [`longerOrEqualTo`](./longer-or-equal-to) — opposite direction
- [`maxLength`](./max-length) — same operator but compares to a literal length
