import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { BooleanValidators } from '../../validators/boolean.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardFalsyDirective,
        },
    ],
    selector: '[nguardFalsy]',
    standalone: true,
})
export class NguardFalsyDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return BooleanValidators.falsy(control);
    }
}
