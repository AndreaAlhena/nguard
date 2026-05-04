import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardUuidDirective,
        },
    ],
    selector: '[nguardUuid]',
    standalone: true,
})
export class NguardUuidDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.uuid(control);
    }
}
