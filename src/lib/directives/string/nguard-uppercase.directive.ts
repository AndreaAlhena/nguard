import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Validators
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardUppercaseDirective,
        },
    ],
    selector: '[nguardUppercase]',
    standalone: true,
})
export class NguardUppercaseDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.uppercase(control);
    }
}
