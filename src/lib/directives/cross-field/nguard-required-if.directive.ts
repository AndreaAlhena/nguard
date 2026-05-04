import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';
import { FieldConditionConfig } from '../../types/field-condition-config.type';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardRequiredIfDirective,
        },
    ],
    selector: '[nguardRequiredIf]',
    standalone: true,
})
export class NguardRequiredIfDirective implements Validator {
    public readonly config = input.required<string | FieldConditionConfig>({ alias: 'nguardRequiredIf' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.config();
        const fieldKey = typeof cfg === 'string' ? cfg : cfg.fieldKey;
        const isStrict = typeof cfg === 'string' ? undefined : cfg.isStrict;
        const value = typeof cfg === 'string' ? undefined : cfg.value;

        return CrossFieldValidators.requiredIf(fieldKey, value, isStrict)(control);
    }
}
