# `sizeBetween`

Validate that the array item count is within `[min, max]` **inclusive**. A non-array value fails.

## Signature

```ts
NguardValidators.Array.sizeBetween(min: number, max: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `min` | `number` | The minimum number of items (inclusive) |
| `max` | `number` | The maximum number of items (inclusive) |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl([], [NguardValidators.Array.sizeBetween(1, 3)]);
```

## Template-driven forms

```html
<!-- The directive takes a [min, max] tuple -->
<input ngModel name="tags" [nguardSizeBetween]="[1, 3]" />
```

## Error key

`{ sizeBetween: true }`

## Notes

- A non-array value (including `null`/`undefined`) fails.

## See also

- [`minSize`](./min-size) — minimum item count
- [`maxSize`](./max-size) — maximum item count
