import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardNotBlankDirective,
        },
    ],
    selector: '[nguardNotBlank]',
    standalone: true,
})
export class NguardNotBlankDirective implements Validator {
    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return StringValidators.notBlank(control);
    }
}
