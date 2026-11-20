# `inArray`

Validate that the value is a **member of a sibling field's array**. Fails when the sibling is missing or is not an array.

## Signature

```ts
NguardValidators.Array.inArray(fieldKey: string, isStrict?: boolean): ValidatorFn
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fieldKey` | `string` | — | The key of the sibling field holding the array |
| `isStrict` | `boolean` | `true` | If `true`, membership uses strict equality (`===`); loose (`==`) otherwise |

## Reactive forms

```ts
import { FormControl, FormGroup } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

new FormGroup({
    allowedColors: new FormControl(['red', 'green']),
    color: new FormControl('red', [NguardValidators.Array.inArray('allowedColors')]),
});
```

## Template-driven forms

```html
<!-- Shorthand: strict membership in the 'allowedColors' sibling -->
<input ngModel name="color" [nguardInArray]="'allowedColors'" />

<!-- Object form: loose membership -->
<input ngModel name="id" [nguardInArray]="{ fieldKey: 'allowedIds', isStrict: false }" />
```

## Error key

`{ inArray: true }`

## Notes

- Reads `control.parent?.get(fieldKey)?.value`. Fails when that sibling is missing or not an array.
- Strict by default; pass `isStrict: false` (object form) to allow type coercion (`'1'` matches `1`).

## See also

- [`contains`](./contains) — array contains required members
