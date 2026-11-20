import { Directive } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardNegativeDirective,
        },
    ],
    selector: '[nguardNegative]',
    standalone: true,
})
export class NguardNegativeDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.negative(control);
    }
}
