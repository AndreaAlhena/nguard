# `hexColor`

Validate that a string is a valid hex color: 3, 4, 6, or 8 hex digits, with an optional leading `#`.

## Signature

```ts
NguardValidators.String.hexColor: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const accent = new FormControl('', [NguardValidators.String.hexColor]);
```

## Template-driven forms

```html
<input ngModel name="accent" nguardHexColor />
```

## Error key

`{ hexColor: true }`

## Notes

- Accepted forms: `#fff`, `#ffff` (alpha), `#ffffff`, `#ffffffff` (alpha) — and the same without leading `#`.
- Hex digits are case-insensitive (`#FFF` and `#fff` both pass).
- Empty strings fail.
- Color names like `red` or RGB notations like `rgb(255,0,0)` are not accepted.

## See also

- [`regex`](./regex) — for custom color shapes (e.g. only 6-digit `#RRGGBB`)
