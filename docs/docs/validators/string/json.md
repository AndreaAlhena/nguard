# `json`

Validate that a string parses as valid JSON.

## Signature

```ts
NguardValidators.String.json: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'nguard';

const config = new FormControl('', [NguardValidators.String.json]);
```

## Template-driven forms

```html
<textarea ngModel name="config" nguardJson></textarea>
```

## Error key

`{ json: true }`

## Notes

- Implementation calls `JSON.parse` and treats any thrown exception as a failure.
- Both objects (`'{}'`) and primitives (`'42'`, `'"hello"'`) parse as valid JSON.
- Empty strings fail.
- Doesn't validate against any schema — use a separate validator if you need structural checks.

## See also

- [`regex`](./regex) — for custom shape constraints if you need partial JSON
