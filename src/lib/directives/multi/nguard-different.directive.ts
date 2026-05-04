import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Types
import { FieldComparisonConfig } from '../../types/field-comparison-config.type';

// Validators
import { MultiValidators } from '../../validators/multi.validators';

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
    @Input('nguardDifferent') public config!: string | FieldComparisonConfig;

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        const args: [string] | [string, boolean | undefined] =
            typeof this.config === 'string' ? [this.config] : [this.config.fieldKey, this.config.isStrict];

        return MultiValidators.different.apply(this, args)(control);
    }
}
