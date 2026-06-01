# `inList`

The value must be **one of** the given strings (strict membership via `Array.includes`).

## Signature

```ts
NguardValidators.String.inList(...values: string[]): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `...values` | `string[]` | The allowed values |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormControl('', [NguardValidators.String.inList('draft', 'published')]);
```

## Template-driven forms

```html
<!-- Array form -->
<input ngModel name="status" [nguardStringInList]="['draft', 'published']" />

<!-- Single value shorthand -->
<input ngModel name="status" [nguardStringInList]="'draft'" />
```

The directive selector is `nguardStringInList` (data-type prefixed; the `Number` counterpart is `nguardNumberInList`).

## Error key

`{ inList: true }`

## Notes

- **Strict** comparison — `5` (number) does not match `'5'` (string).

## See also

- [`notInList`](./not-in-list) — disallowed values
- [`inEnum`](./in-enum) — membership in a TypeScript enum
