import { Directive } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { BooleanValidators } from '../../validators/boolean.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardTruthyDirective,
        },
    ],
    selector: '[nguardTruthy]',
    standalone: true,
})
export class NguardTruthyDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return BooleanValidators.truthy(control);
    }
}
