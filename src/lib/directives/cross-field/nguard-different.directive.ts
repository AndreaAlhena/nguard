import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Types
import { FieldComparisonConfig } from '../../types/field-comparison-config.type';

// Validators
import { CrossFieldValidators } from '../../validators/cross-field.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardDifferentDirective,
        },
    ],
    selector: '[nguardDifferent]',
    standalone: true,
})
export class NguardDifferentDirective implements Validator {
    public readonly config = input.required<string | FieldComparisonConfig>({ alias: 'nguardDifferent' });

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        const cfg = this.config();
        const [fieldKey, isStrict]: [string, boolean | undefined] =
            typeof cfg === 'string' ? [cfg, undefined] : [cfg.fieldKey, cfg.isStrict];

        return CrossFieldValidators.different(fieldKey, isStrict)(control);
    }
}
