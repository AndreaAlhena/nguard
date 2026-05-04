import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardBetweenDirective,
        },
    ],
    selector: '[nguardBetween]',
    standalone: true,
})
export class NguardBetweenDirective implements Validator {
    public readonly values = input.required<[number, number]>({ alias: 'nguardBetween' });

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return NumberValidators.between(...this.values())(control);
    }
}
