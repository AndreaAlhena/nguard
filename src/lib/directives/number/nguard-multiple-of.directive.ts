import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardMultipleOfDirective,
        },
    ],
    selector: '[nguardMultipleOf]',
    standalone: true,
})
export class NguardMultipleOfDirective implements Validator {
    public readonly divisor = input.required<number>({ alias: 'nguardMultipleOf' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.multipleOf(this.divisor())(control);
    }
}
