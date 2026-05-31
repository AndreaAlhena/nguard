import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ArrayValidators } from '../../validators/array.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardDistinctDirective,
        },
    ],
    selector: '[nguardDistinct]',
    standalone: true,
})
export class NguardDistinctDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return ArrayValidators.distinct(control);
    }
}
