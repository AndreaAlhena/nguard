# `string`

Validate that a value is a string (`typeof === 'string'`). Companion to Laravel's `string` rule. Useful when explicit type guarding is needed separately from any other constraint.

## Signature

```ts
NguardValidators.String.string: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const note = new FormControl('', [NguardValidators.String.string]);
```

## Template-driven forms

```html
<input ngModel name="note" nguardString />
```

## Error key

`{ string: true }`

## Notes

- Empty strings pass — `''` is still a string.
- `null`, `undefined`, numbers, booleans, objects, arrays all fail.
- Most other String validators already perform a string-type check internally; reach for `string` only when you want a pure type assertion separate from any format/length constraint.

## See also

- [`notBlank`](./not-blank) — string and non-empty after trimming
