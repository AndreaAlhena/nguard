# `alpha`

Validate that a string contains only Unicode alphabetic characters (matched by `\p{L}` and `\p{M}`).

## Signature

```ts
NguardValidators.String.alpha(hasAsciiOnly?: boolean): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `hasAsciiOnly` | `boolean` | `false` | If `true`, restricts characters to ASCII range (`a-z`, `A-Z`) |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

// Unicode alphabetic — accepts 'café', '日本'
const name = new FormControl('', [NguardValidators.String.alpha()]);

// ASCII-only — accepts 'abc', rejects 'café'
const ascii = new FormControl('', [NguardValidators.String.alpha(true)]);
```

## Template-driven forms

```html
<!-- Default: Unicode alphabetic -->
<input ngModel name="name" nguardAlpha />

<!-- ASCII-only mode via config object -->
<input ngModel name="ascii" [nguardAlpha]="{ hasAsciiOnly: true }" />
```

## Error key

`{ alpha: true }`

## Notes

- The Unicode default uses `\p{L}\p{M}` (letters and combining marks) — accepts characters from any script.
- ASCII mode restricts to `[a-zA-Z]+` — useful when interfacing with systems that don't handle Unicode.
- Empty strings fail; the validator requires at least one character.
- `null`, `undefined`, non-string inputs all fail.

## See also

- [`alphaNum`](./alpha-num) — adds digits
- [`alphaDash`](./alpha-dash) — adds digits, dashes, underscores
- [`ascii`](./ascii) — broader ASCII range (printable + control characters)
