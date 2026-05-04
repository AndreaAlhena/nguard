import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardMaxDirective,
        },
    ],
    selector: '[nguardMax]',
    standalone: true,
})
export class NguardMaxDirective implements Validator {
    public readonly maxVal = input.required<number>({ alias: 'nguardMax' });

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return NumberValidators.max(this.maxVal())(control);
    }
}
