# `falsy`

Validate that the value is **falsy** in the JavaScript sense — i.e. `Boolean(value)` evaluates to `false`.

## Signature

```ts
NguardValidators.Boolean.falsy: ValidatorFn
```

Accepts: `false`, `0`, `''`, `null`, `undefined`, `NaN`. Rejects everything else.

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    optedOut: new FormControl(false, [NguardValidators.Boolean.falsy]),
});
```

## Template-driven forms

```html
<input ngModel name="optedOut" nguardFalsy />
```

## Error key

`{ falsy: true }`

## Notes

- Strings like `'false'` and `'0'` are **truthy** in JavaScript (they are non-empty strings) and therefore fail this rule.

## See also

- [`truthy`](./truthy) — opposite check
- [`boolean`](./boolean) — strict boolean-like type check
