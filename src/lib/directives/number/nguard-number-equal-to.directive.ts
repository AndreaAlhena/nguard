import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardNumberEqualToDirective,
        },
    ],
    selector: '[nguardNumberEqualTo]',
    standalone: true,
})
export class NguardNumberEqualToDirective implements Validator {
    public readonly value = input.required<number>({ alias: 'nguardNumberEqualTo' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.equalTo(this.value())(control);
    }
}
