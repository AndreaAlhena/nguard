# `truthy`

Validate that the value is **truthy** in the JavaScript sense — i.e. `Boolean(value)` evaluates to `true`.

## Signature

```ts
NguardValidators.Boolean.truthy: ValidatorFn
```

Rejects every falsy value: `false`, `0`, `''`, `null`, `undefined`, `NaN`. Accepts everything else.

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    confirmed: new FormControl(true, [NguardValidators.Boolean.truthy]),
});
```

## Template-driven forms

```html
<input ngModel name="confirmed" nguardTruthy />
```

## Error key

`{ truthy: true }`

## Notes

- This is purely about JavaScript truthiness. Strings like `'false'` and `'0'` are truthy because they are non-empty strings — if you need Laravel-style acceptance, use [`accepted`](./accepted).

## See also

- [`falsy`](./falsy) — opposite check
- [`accepted`](./accepted) — Laravel-style acceptance set
- [`boolean`](./boolean) — strict boolean-like type check
