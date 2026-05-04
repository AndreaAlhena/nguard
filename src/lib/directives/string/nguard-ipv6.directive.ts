import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardIpv6Directive,
        },
    ],
    selector: '[nguardIpv6]',
    standalone: true,
})
export class NguardIpv6Directive implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.ipv6(control);
    }
}
