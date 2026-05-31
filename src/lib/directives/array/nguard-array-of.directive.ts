import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { ArrayValidators } from '../../validators/array.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardArrayOfDirective,
        },
    ],
    selector: '[nguardArrayOf]',
    standalone: true,
})
export class NguardArrayOfDirective implements Validator {
    public readonly validator = input.required<ValidatorFn>({ alias: 'nguardArrayOf' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return ArrayValidators.arrayOf(this.validator())(control);
    }
}
