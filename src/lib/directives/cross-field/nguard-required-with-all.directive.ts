import { Directive, input } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardRequiredWithAllDirective,
        },
    ],
    selector: '[nguardRequiredWithAll]',
    standalone: true,
})
export class NguardRequiredWithAllDirective implements Validator {
    public readonly fieldKeys = input.required<string | string[]>({ alias: 'nguardRequiredWithAll' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.fieldKeys();
        const keys = typeof cfg === 'string' ? [cfg] : cfg;

        return CrossFieldValidators.requiredWithAll(...keys)(control);
    }
}
