import { Directive, Input } from '@angular/core';
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
    @Input('nguardMin') public minVal!: number;

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return NumberValidators.min(this.minVal)(control);
    }
}
