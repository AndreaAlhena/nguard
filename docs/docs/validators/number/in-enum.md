# `inEnum`

The value must be one of a **TypeScript enum's numeric values**. The control value is coerced numerically; non-numeric values fail.

## Signature

```ts
NguardValidators.Number.inEnum(enumObject: Record<string, string | number>): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `enumObject` | `Record<string, string \| number>` | The enum to check membership against |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

enum Priority {
    Low = 1,
    High = 5,
}

new FormControl('', [NguardValidators.Number.inEnum(Priority)]);
```

## Template-driven forms

```html
<input ngModel name="priority" [nguardNumberInEnum]="Priority" />
```

## Error key

`{ inEnum: true }`

## Notes

- Membership is checked against the enum's **values**. The reverse-mapping keys numeric enums generate are filtered out, so a key number like `3` (absent from the values) correctly fails.

## See also

- [`inList`](./in-list) — membership in an explicit list
