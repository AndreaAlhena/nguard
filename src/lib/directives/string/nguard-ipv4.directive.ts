import { Directive } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardIpv4Directive,
        },
    ],
    selector: '[nguardIpv4]',
    standalone: true,
})
export class NguardIpv4Directive implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.ipv4(control);
    }
}
