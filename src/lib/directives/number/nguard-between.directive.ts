import { Directive, Input } from '@angular/core';
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
    @Input('nguardBetween') public values!: [number, number];

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return NumberValidators.between(...this.values)(control);
    }
}
