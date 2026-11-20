import { Directive, input } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { ArrayValidators } from '../../validators/array.validators';
import type { FieldComparisonConfig } from '../../types/field-comparison-config.type';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardInArrayDirective,
        },
    ],
    selector: '[nguardInArray]',
    standalone: true,
})
export class NguardInArrayDirective implements Validator {
    public readonly config = input.required<string | FieldComparisonConfig>({ alias: 'nguardInArray' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.config();
        const fieldKey = typeof cfg === 'string' ? cfg : cfg.fieldKey;
        const isStrict = typeof cfg === 'string' ? undefined : cfg.isStrict;

        return ArrayValidators.inArray(fieldKey, isStrict)(control);
    }
}
