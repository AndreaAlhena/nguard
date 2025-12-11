import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MultiValidators } from '../../validators/multi.validators';
import { IRequiredIfConfig } from '../../interfaces/required-if-config.interface';
import { primitive } from '../../utils/validators.utils';

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
    @Input('nguardRequiredIf') public config!: string | IRequiredIfConfig;

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        const fieldKey = typeof this.config === 'string' ? this.config : this.config.fieldKey;

        let isStrict: boolean | undefined, value: primitive | undefined;

        if (typeof this.config === 'object') {
            isStrict = this.config?.isStrict;
            value = this.config?.value;
        }

        return MultiValidators.requiredIf(fieldKey, value, isStrict)(control);
    }
}
