import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { BooleanValidators } from '../../validators/boolean.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardBooleanDirective,
        },
    ],
    selector: '[nguardBoolean]',
    standalone: true,
})
export class NguardBooleanDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return BooleanValidators.boolean(control);
    }
}
