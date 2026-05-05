# `maxLength`

Validate that a string has at most N characters.

## Signature

```ts
NguardValidators.String.maxLength(n: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `n` | `number` | Maximum allowed length |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const username = new FormControl('', [NguardValidators.String.maxLength(20)]);
```

## Template-driven forms

```html
<input ngModel name="username" [nguardMaxLength]="20" />
```

## Error key

`{ maxLength: true }`

## Notes

- The check is `<=` (inclusive). `maxLength(20)` accepts length 20.
- `null`, `undefined`, non-string inputs all fail.
- Empty strings pass any `maxLength(n)` where `n >= 0`.

## See also

- [`minLength`](./min-length) — lower-bound counterpart
- [`length`](./length) — exact length
