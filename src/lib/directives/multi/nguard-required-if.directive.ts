import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MultiValidators } from '../../validators/multi.validators';
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

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        const cfg = this.config();
        const fieldKey = typeof cfg === 'string' ? cfg : cfg.fieldKey;
        const isStrict = typeof cfg === 'string' ? undefined : cfg.isStrict;
        const value = typeof cfg === 'string' ? undefined : cfg.value;

        return MultiValidators.requiredIf(fieldKey, value, isStrict)(control);
    }
}
