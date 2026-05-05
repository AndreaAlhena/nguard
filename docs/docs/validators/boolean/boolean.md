---
slug: /validators/boolean/boolean
---

# `boolean`

Validate that the value is **boolean-like** (Laravel parity). Accepts the same six inputs as Laravel's `boolean` rule.

## Signature

```ts
NguardValidators.Boolean.boolean: ValidatorFn
```

| Accepted input | Notes |
|---|---|
| `true`, `false` | native booleans |
| `1`, `0` | numeric truth/false |
| `'1'`, `'0'` | stringified numeric truth/false |

Anything else — including `'true'`, `'false'`, `'yes'`, `null`, `undefined` — fails.

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    isActive: new FormControl(false, [NguardValidators.Boolean.boolean]),
});
```

## Template-driven forms

```html
<input ngModel name="isActive" nguardBoolean />
```

## Error key

`{ boolean: true }`

## Notes

- This is a **type/shape** check — for "value evaluates as truthy" use [`truthy`](./truthy).
- `null` and `undefined` are rejected. Pair with another rule (e.g. an explicit nullable check) if you want to allow them.

## See also

- [`truthy`](./truthy) — any truthy value
- [`falsy`](./falsy) — any falsy value
