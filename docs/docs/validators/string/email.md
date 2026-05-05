# `email`

Validate that a string is a syntactically valid email address (RFC 5322 compliant).

## Signature

```ts
NguardValidators.String.email: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const email = new FormControl('', [NguardValidators.String.email]);
```

## Template-driven forms

```html
<input ngModel name="email" type="email" nguardEmail />
```

## Error key

`{ email: true }`

## Notes

- Validates **syntax**, not deliverability — `someone@nonexistent.example` passes the regex but won't receive mail.
- Empty strings fail.
- Use a server-side reachability check for true verification (e.g. an Async validator hitting an SMTP probe).

## See also

- [`url`](./url) — sibling format check for URLs
- [`regex`](./regex) — for custom email shapes (e.g. corporate domain only)
