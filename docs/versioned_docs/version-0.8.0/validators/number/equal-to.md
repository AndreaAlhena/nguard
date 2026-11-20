# `equalTo`

The value must **equal** the given number. The control value is coerced numerically (so `'42'` matches `42`); non-numeric values fail.

## Signature

```ts
NguardValidators.Number.equalTo(value: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `value` | `number` | The value the field must equal |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.Number.equalTo(42)]);
```

## Template-driven forms

```html
<input ngModel name="answer" [nguardNumberEqualTo]="42" />
```

## Error key

`{ equalTo: true }`

## Notes

- Numeric coercion — `'42'` matches `42`. Non-numeric values fail.
- For matching another **field**, use a cross-field validator instead.

## See also

- [`notEqualTo`](./not-equal-to) — opposite intent
