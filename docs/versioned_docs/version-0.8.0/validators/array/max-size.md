# `maxSize`

Validate that the array has **at most** `max` items. A non-array value fails.

## Signature

```ts
NguardValidators.Array.maxSize(max: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `max` | `number` | The maximum number of items (inclusive) |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl([], [NguardValidators.Array.maxSize(3)]);
```

## Template-driven forms

```html
<input ngModel name="tags" [nguardMaxSize]="3" />
```

## Error key

`{ maxSize: true }`

## Notes

- A non-array value (including `null`/`undefined`) fails.

## See also

- [`minSize`](./min-size) — minimum item count
- [`sizeBetween`](./size-between) — bounded item count
