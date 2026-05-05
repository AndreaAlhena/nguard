# `url`

Validate that a string is a syntactically valid URL.

## Signature

```ts
NguardValidators.String.url: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const homepage = new FormControl('', [NguardValidators.String.url]);
```

## Template-driven forms

```html
<input ngModel name="homepage" type="url" nguardUrl />
```

## Error key

`{ url: true }`

## Notes

- Accepts the common shapes:
  - `http://www.example.com`
  - `https://www.example.com`
  - `www.example.com`
  - `example.com`
- Query strings and complex paths are accepted.
- Validates **syntax**, not reachability — use an Async validator for live checks.
- A protocol-less URL (`example.com`) passes. If you require a scheme, combine with [`regex`](./regex) (`/^https?:\/\//`).

## See also

- [`email`](./email) — sibling format check
- [`regex`](./regex) — for stricter URL shapes (scheme-required, specific TLD, etc.)
