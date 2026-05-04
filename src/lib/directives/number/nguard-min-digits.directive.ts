import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardMinDigitsDirective,
        },
    ],
    selector: '[nguardMinDigits]',
    standalone: true,
})
export class NguardMinDigitsDirective implements Validator {
    public readonly minDigits = input.required<number>({ alias: 'nguardMinDigits' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.minDigits(this.minDigits())(control);
    }
}
