import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardDigitsBetweenDirective,
        },
    ],
    selector: '[nguardDigitsBetween]',
    standalone: true,
})
export class NguardDigitsBetweenDirective implements Validator {
    public readonly values = input.required<[number, number]>({ alias: 'nguardDigitsBetween' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.digitsBetween(...this.values())(control);
    }
}
