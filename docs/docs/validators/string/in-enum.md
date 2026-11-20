# `inEnum`

The value must be one of a **TypeScript enum's values**.

## Signature

```ts
NguardValidators.String.inEnum(enumObject: Record<string, string | number>): ValidatorFn
```

| Parameter | Type | Description |
|---|---|---|
| `enumObject` | `Record<string, string \| number>` | The enum to check membership against |

## Reactive forms

```ts
import { FormControl } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

enum Status {
    Draft = 'draft',
    Published = 'published',
}

new FormControl('', [NguardValidators.String.inEnum(Status)]);
```

## Template-driven forms

```html
<input ngModel name="status" [nguardStringInEnum]="Status" />
```

(`Status` is exposed as a component property.)

## Error key

`{ inEnum: true }`

## Notes

- Membership is checked against the enum's **values**. The reverse-mapping keys that numeric enums generate are filtered out, so both string and numeric enums work correctly.

## See also

- [`inList`](./in-list) — membership in an explicit list
