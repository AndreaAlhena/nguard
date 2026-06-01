# `notInList`

The value must **not** be one of the given numbers. The control value is coerced numerically; non-numeric values pass.

## Signature

```ts
NguardValidators.Number.notInList(...values: number[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `number[]` | The disallowed values |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.Number.notInList(0, 13)]);
```

## Template-driven forms

```html
<input ngModel name="floor" [nguardNumberNotInList]="[0, 13]" />
<input ngModel name="floor" [nguardNumberNotInList]="13" />
```

## Error key

`{ notInList: true }`

## Notes

- Numeric coercion. A non-numeric value is not in the numeric list, so it passes.

## See also

- [`inList`](./in-list) — allowed values
