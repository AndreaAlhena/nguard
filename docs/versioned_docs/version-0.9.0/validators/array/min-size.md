# `minSize`

Validate that the array has **at least** `min` items. A non-array value fails.

## Signature

```ts
NguardValidators.Array.minSize(min: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `min` | `number` | The minimum number of items (inclusive) |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl([], [NguardValidators.Array.minSize(1)]);
```

## Template-driven forms

```html
<input ngModel name="tags" [nguardMinSize]="1" />
```

## Error key

`{ minSize: true }`

## Notes

- A non-array value (including `null`/`undefined`) fails. Compose with an optional rule if empty should pass.

## See also

- [`maxSize`](./max-size) — maximum item count
- [`sizeBetween`](./size-between) — bounded item count
