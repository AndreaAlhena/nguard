import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardOddDirective,
        },
    ],
    selector: '[nguardOdd]',
    standalone: true,
})
export class NguardOddDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.odd(control);
    }
}
