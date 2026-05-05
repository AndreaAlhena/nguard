import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';
import { FieldConditionConfig } from '../../types/field-condition-config.type';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardPresentIfDirective,
        },
    ],
    selector: '[nguardPresentIf]',
    standalone: true,
})
export class NguardPresentIfDirective implements Validator {
    public readonly config = input.required<string | FieldConditionConfig>({ alias: 'nguardPresentIf' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.config();
        const fieldKey = typeof cfg === 'string' ? cfg : cfg.fieldKey;
        const isStrict = typeof cfg === 'string' ? undefined : cfg.isStrict;
        const value = typeof cfg === 'string' ? undefined : cfg.value;

        return CrossFieldValidators.presentIf(fieldKey, value, isStrict)(control);
    }
}
