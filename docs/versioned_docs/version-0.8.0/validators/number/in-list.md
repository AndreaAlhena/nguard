# `inList`

The value must be **one of** the given numbers. The control value is coerced numerically (so `'2'` matches `2`); non-numeric values fail.

## Signature

```ts
NguardValidators.Number.inList(...values: number[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `number[]` | The allowed values |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.Number.inList(1, 2, 3)]);
```

## Template-driven forms

```html
<!-- Array form -->
<input ngModel name="size" [nguardNumberInList]="[1, 2, 3]" />

<!-- Single value shorthand -->
<input ngModel name="size" [nguardNumberInList]="1" />
```

## Error key

`{ inList: true }`

## Notes

- Numeric coercion — `'3'` matches `3`. Non-numeric values fail.

## See also

- [`notInList`](./not-in-list) — disallowed values
- [`inEnum`](./in-enum) — membership in a numeric enum
