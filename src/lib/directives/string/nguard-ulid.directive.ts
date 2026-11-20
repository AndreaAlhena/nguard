import { Directive } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardUlidDirective,
        },
    ],
    selector: '[nguardUlid]',
    standalone: true,
})
export class NguardUlidDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.ulid(control);
    }
}
