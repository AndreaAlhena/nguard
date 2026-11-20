# `notInList`

The value must **not** be one of the given strings (strict membership via `Array.includes`).

## Signature

```ts
NguardValidators.String.notInList(...values: string[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `string[]` | The disallowed values |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.notInList('admin', 'root')]);
```

## Template-driven forms

```html
<input ngModel name="username" [nguardStringNotInList]="['admin', 'root']" />
<input ngModel name="username" [nguardStringNotInList]="'admin'" />
```

## Error key

`{ notInList: true }`

## Notes

- **Strict** comparison — a value of a different type is considered "not in the list" and passes.

## See also

- [`inList`](./in-list) — allowed values
