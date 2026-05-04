import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardNumericDirective,
        },
    ],
    selector: '[nguardNumeric]',
    standalone: true,
})
export class NguardNumericDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.numeric(control);
    }
}
