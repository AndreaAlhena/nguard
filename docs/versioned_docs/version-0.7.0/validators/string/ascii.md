# `ascii`

Validate that a string contains only ASCII characters from the standard table — horizontal tab, line feed, carriage return, and the printable range (space to `~`). Extended ASCII characters fail.

## Signature

```ts
NguardValidators.String.ascii: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const safeId = new FormControl('', [NguardValidators.String.ascii]);
```

## Template-driven forms

```html
<input ngModel name="safeId" nguardAscii />
```

## Error key

`{ ascii: true }`

## Notes

- Allowed: space (`\x20`) through tilde (`\x7E`), plus `\t`, `\n`, `\r`.
- Rejected: extended ASCII (`\x80+`), Unicode characters outside ASCII (`café`, `日本`).
- Empty strings fail.
- Useful for fields that must round-trip through legacy systems.

## See also

- [`alpha`](./alpha) — alphabetic restriction (Unicode by default)
- [`alphaNum`](./alpha-num) — alphanumeric restriction
