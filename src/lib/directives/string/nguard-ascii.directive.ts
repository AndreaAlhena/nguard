import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Validators
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardAsciiDirective,
        },
    ],
    selector: '[nguardAscii]',
    standalone: true,
})
export class NguardAsciiDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.ascii(control);
    }
}
