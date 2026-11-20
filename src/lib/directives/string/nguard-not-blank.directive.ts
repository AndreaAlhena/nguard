import { Directive } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
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
    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.notBlank(control);
    }
}
