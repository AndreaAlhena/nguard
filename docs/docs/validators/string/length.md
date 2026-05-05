# `length`

Validate that a string has exactly N characters.

## Signature

```ts
NguardValidators.String.length(n: number): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `n` | `number` | The required string length |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const code = new FormControl('', [NguardValidators.String.length(6)]);
```

## Template-driven forms

```html
<input ngModel name="code" [nguardLength]="6" />
```

## Error key

`{ length: true }`

## Notes

- Length is `value.length` — for strings with surrogate pairs (some emoji), this counts code units, not code points.
- `length(0)` accepts empty strings.
- `null`, `undefined`, non-string inputs all fail.

## See also

- [`minLength`](./min-length) / [`maxLength`](./max-length) — single-bound variants
