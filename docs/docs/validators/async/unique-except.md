---
slug: /validators/async/unique-except
---

# `uniqueExcept`

Like [`unique`](./unique), but ignores one record — for **edit forms** where the value legitimately belongs to the record being edited. The `exceptId` is sent alongside the value (param `except`).

## Signature

```ts
NguardValidators.Async.uniqueExcept(exceptId: primitive, config: AsyncValidatorConfig): AsyncValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `exceptId` | `primitive` | The id of the record to exclude from the uniqueness check |
| `config` | `AsyncValidatorConfig` | Same config as [`unique`](./unique), including the `resolve` callback |

## Default rule (no `resolve`)

Same as [`unique`](./unique): `2xx` → taken (**invalid** `{ unique: true }`), `404` → free (valid), anything else → undecided (valid).

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

email = new FormControl('', {
    asyncValidators: [NguardValidators.Async.uniqueExcept(this.user.id, { endpoint: '/api/users/check-email' })],
});
```

## Template-driven forms

```html
<input
    ngModel
    name="email"
    [nguardUniqueExcept]="{ endpoint: '/api/users/check-email' }"
    [nguardUniqueExceptId]="user.id"
/>
```

## Error key

`{ unique: true }`

## Notes

- Reports the same `unique` error key as [`unique`](./unique).
- Sends `except={exceptId}` (query param for GET, body key for POST/PUT) so the backend skips that record.
- Must be created in an injection context; debounced with cancellation. Override the status-code default with `config.resolve` when needed.

## See also

- [`unique`](./unique) — create forms (no record to exclude)
