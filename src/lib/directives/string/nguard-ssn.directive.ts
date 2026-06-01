import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardSsnDirective,
        },
    ],
    selector: '[nguardSsn]',
    standalone: true,
})
export class NguardSsnDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.ssn(control);
    }
}
