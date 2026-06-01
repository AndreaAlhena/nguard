import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardNumberNotEqualToDirective,
        },
    ],
    selector: '[nguardNumberNotEqualTo]',
    standalone: true,
})
export class NguardNumberNotEqualToDirective implements Validator {
    public readonly value = input.required<number>({ alias: 'nguardNumberNotEqualTo' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.notEqualTo(this.value())(control);
    }
}
