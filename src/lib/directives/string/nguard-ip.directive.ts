import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardIpDirective,
        },
    ],
    selector: '[nguardIp]',
    standalone: true,
})
export class NguardIpDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.ip(control);
    }
}
