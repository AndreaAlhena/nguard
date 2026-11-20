import { Directive, input } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';
import type { FieldComparisonConfig } from '../../types/field-comparison-config.type';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardSameDirective,
        },
    ],
    selector: '[nguardSame]',
    standalone: true,
})
export class NguardSameDirective implements Validator {
    public readonly config = input.required<string | FieldComparisonConfig>({ alias: 'nguardSame' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.config();
        const [fieldKey, isStrict]: [string, boolean | undefined] =
            typeof cfg === 'string' ? [cfg, undefined] : [cfg.fieldKey, cfg.isStrict];

        return CrossFieldValidators.same(fieldKey, isStrict)(control);
    }
}
