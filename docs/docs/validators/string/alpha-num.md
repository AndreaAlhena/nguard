# `alphaNum`

Validate that a string contains only Unicode alphanumeric characters (letters and digits).

## Signature

```ts
NguardValidators.String.alphaNum(hasAsciiOnly?: boolean): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `hasAsciiOnly` | `boolean` | `false` | If `true`, restricts characters to ASCII alphanumerics (`a-z`, `A-Z`, `0-9`) |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const code = new FormControl('', [NguardValidators.String.alphaNum()]);
const ascii = new FormControl('', [NguardValidators.String.alphaNum(true)]);
```

## Template-driven forms

```html
<input ngModel name="code" nguardAlphaNum />
<input ngModel name="ascii" [nguardAlphaNum]="{ hasAsciiOnly: true }" />
```

## Error key

`{ alphaNum: true }`

## Notes

- Default Unicode mode uses `\p{L}\p{M}\p{N}` — letters, combining marks, and any numeric character.
- ASCII mode restricts to `[a-zA-Z0-9]+`.
- Empty strings fail.
- No dashes, underscores, or whitespace.

## See also

- [`alpha`](./alpha) — letters only, no digits
- [`alphaDash`](./alpha-dash) — adds dashes and underscores
