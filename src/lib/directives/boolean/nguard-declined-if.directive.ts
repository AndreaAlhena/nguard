import { Directive, input } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { BooleanValidators } from '../../validators/boolean.validators';
import type { FieldConditionConfig } from '../../types/field-condition-config.type';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardDeclinedIfDirective,
        },
    ],
    selector: '[nguardDeclinedIf]',
    standalone: true,
})
export class NguardDeclinedIfDirective implements Validator {
    public readonly config = input.required<string | FieldConditionConfig>({ alias: 'nguardDeclinedIf' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.config();
        const fieldKey = typeof cfg === 'string' ? cfg : cfg.fieldKey;
        const isStrict = typeof cfg === 'string' ? undefined : cfg.isStrict;
        const value = typeof cfg === 'string' ? undefined : cfg.value;

        return BooleanValidators.declinedIf(fieldKey, value, isStrict)(control);
    }
}
