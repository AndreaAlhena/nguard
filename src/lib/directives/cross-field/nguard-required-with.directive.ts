import { Directive, input } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardRequiredWithDirective,
        },
    ],
    selector: '[nguardRequiredWith]',
    standalone: true,
})
export class NguardRequiredWithDirective implements Validator {
    public readonly fieldKeys = input.required<string | string[]>({ alias: 'nguardRequiredWith' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.fieldKeys();
        const keys = typeof cfg === 'string' ? [cfg] : cfg;

        return CrossFieldValidators.requiredWith(...keys)(control);
    }
}
