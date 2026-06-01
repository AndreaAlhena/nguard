# `notEqualTo`

The value must **not** equal the given number. The control value is coerced numerically; non-numeric values pass.

## Signature

```ts
NguardValidators.Number.notEqualTo(value: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `value` | `number` | The value the field must not equal |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.Number.notEqualTo(0)]);
```

## Template-driven forms

```html
<input ngModel name="quantity" [nguardNumberNotEqualTo]="0" />
```

## Error key

`{ notEqualTo: true }`

## Notes

- Numeric coercion. A non-numeric value is not equal to the target, so it passes.

## See also

- [`equalTo`](./equal-to) — opposite intent
