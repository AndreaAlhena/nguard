import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardDigitsDirective,
        },
    ],
    selector: '[nguardDigits]',
    standalone: true,
})
export class NguardDigitsDirective implements Validator {
    public readonly digits = input.required<number>({ alias: 'nguardDigits' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.digits(this.digits())(control);
    }
}
