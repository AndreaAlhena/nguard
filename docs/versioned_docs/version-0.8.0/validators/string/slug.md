# `slug`

Validate that a string is a valid URL slug — lowercase alphanumeric characters separated by single dashes, no leading, trailing, or consecutive dashes.

## Signature

```ts
NguardValidators.String.slug: ValidatorFn
```

A parameterless validator — used directly without invocation.

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const slug = new FormControl('', [NguardValidators.String.slug]);
```

## Template-driven forms

```html
<input ngModel name="slug" nguardSlug />
```

## Error key

`{ slug: true }`

## Notes

- Pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`.
- Accepts: `my-blog-post`, `post-2024-update`, `hello`.
- Rejects: `My-Post` (uppercase), `-leading`, `trailing-`, `double--dash`, `with space`.
- Empty strings fail.

## See also

- [`alphaDash`](./alpha-dash) — looser: allows uppercase, underscores, and consecutive dashes
- [`lowercase`](./lowercase) — case constraint without dash structure
