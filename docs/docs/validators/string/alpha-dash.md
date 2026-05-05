# `alphaDash`

Validate that a string contains only Unicode alphanumeric characters plus dashes and underscores.

## Signature

```ts
NguardValidators.String.alphaDash(hasAsciiOnly?: boolean): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `hasAsciiOnly` | `boolean` | `false` | If `true`, restricts characters to ASCII alphanumerics (`a-z`, `A-Z`, `0-9`) plus dash and underscore |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const username = new FormControl('', [NguardValidators.String.alphaDash()]);

// ASCII-only username
const asciiUsername = new FormControl('', [NguardValidators.String.alphaDash(true)]);
```

## Template-driven forms

```html
<input ngModel name="username" nguardAlphaDash />
<input ngModel name="ascii" [nguardAlphaDash]="{ hasAsciiOnly: true }" />
```

## Error key

`{ alphaDash: true }`

## Notes

- Default Unicode mode allows any letter/digit plus `-` and `_`.
- ASCII mode restricts to `[a-zA-Z0-9_-]+`.
- Empty strings fail.
- Spaces fail — use `regex` for finer control.

## See also

- [`alpha`](./alpha) — letters only, no digits or dashes
- [`alphaNum`](./alpha-num) — letters and digits only, no dashes
