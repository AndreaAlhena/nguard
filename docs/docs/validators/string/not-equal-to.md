# `notEqualTo`

The value must **not** be exactly equal to the given string (strict equality).

## Signature

```ts
NguardValidators.String.notEqualTo(value: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `value` | `string` | The value the field must not equal |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.notEqualTo('default')]);
```

## Template-driven forms

```html
<input ngModel name="name" [nguardStringNotEqualTo]="'default'" />
```

## Error key

`{ notEqualTo: true }`

## Notes

- Uses strict inequality (`!==`).

## See also

- [`equalTo`](./equal-to) — opposite intent
