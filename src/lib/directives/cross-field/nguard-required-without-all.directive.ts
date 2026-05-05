import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardRequiredWithoutAllDirective,
        },
    ],
    selector: '[nguardRequiredWithoutAll]',
    standalone: true,
})
export class NguardRequiredWithoutAllDirective implements Validator {
    public readonly fieldKeys = input.required<string | string[]>({ alias: 'nguardRequiredWithoutAll' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.fieldKeys();
        const keys = typeof cfg === 'string' ? [cfg] : cfg;

        return CrossFieldValidators.requiredWithoutAll(...keys)(control);
    }
}
