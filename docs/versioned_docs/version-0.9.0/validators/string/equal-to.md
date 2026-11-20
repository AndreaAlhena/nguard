# `equalTo`

The value must be **exactly equal** to the given string (strict equality).

## Signature

```ts
NguardValidators.String.equalTo(value: string): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `value` | `string` | The value the field must equal |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.equalTo('ACCEPTED')]);
```

## Template-driven forms

```html
<input ngModel name="confirmation" [nguardStringEqualTo]="'ACCEPTED'" />
```

## Error key

`{ equalTo: true }`

## Notes

- Uses strict equality (`===`); a value of a different type fails.
- For matching another **field**, use [`String.same`](../cross-field/same) instead.

## See also

- [`notEqualTo`](./not-equal-to) — opposite intent
