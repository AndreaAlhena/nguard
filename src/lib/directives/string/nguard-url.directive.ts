import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardUrlDirective,
        },
    ],
    selector: '[nguardUrl]',
    standalone: true,
})
export class NguardUrlDirective implements Validator {
    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return StringValidators.url(control);
    }
}
