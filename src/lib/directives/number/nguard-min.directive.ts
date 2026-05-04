import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardMinDirective,
        },
    ],
    selector: '[nguardMin]',
    standalone: true,
})
export class NguardMinDirective implements Validator {
    public readonly minVal = input.required<number>({ alias: 'nguardMin' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.min(this.minVal())(control);
    }
}
