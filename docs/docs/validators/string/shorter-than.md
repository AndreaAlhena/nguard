# `shorterThan`

Validate that a string is strictly shorter than another field's string.

## Signature

```ts
NguardValidators.String.shorterThan(fieldKey: string): ValidatorFn
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
        NguardValidators.String.shorterThan('fullName'),
    ]),
});
```

## Template-driven forms

```html
<input ngModel name="fullName" />
<input ngModel name="abbreviation" [nguardShorterThan]="'fullName'" />
```

## Error key

`{ shorterThan: true }`

## Notes

- The check is strict (`<`). Equal lengths fail.
- Both fields must be strings — non-string siblings cause failure.
- If the control has no parent form group, the validator fails.

## See also

- [`shorterOrEqualTo`](./shorter-or-equal-to) — inclusive variant
- [`longerThan`](./longer-than) — opposite direction
- [`maxLength`](./max-length) — same operator but compares to a literal length
