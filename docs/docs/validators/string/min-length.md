# `minLength`

Validate that a string has at least N characters.

## Signature

```ts
NguardValidators.String.minLength(n: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `n` | `number` | Minimum required length |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const password = new FormControl('', [NguardValidators.String.minLength(8)]);
```

## Template-driven forms

```html
<input ngModel name="password" type="password" [nguardMinLength]="8" />
```

## Error key

`{ minLength: true }`

## Notes

- The check is `>=` (inclusive). `minLength(8)` accepts length 8.
- `null`, `undefined`, non-string inputs all fail.
- Whitespace counts toward length — pair with [`notBlank`](./not-blank) if needed.

## See also

- [`maxLength`](./max-length) — upper-bound counterpart
- [`length`](./length) — exact length
