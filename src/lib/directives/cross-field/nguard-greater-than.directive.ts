import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardGreaterThanDirective,
        },
    ],
    selector: '[nguardGreaterThan]',
    standalone: true,
})
export class NguardGreaterThanDirective implements Validator {
    public readonly fieldKey = input.required<string>({ alias: 'nguardGreaterThan' });

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return CrossFieldValidators.greaterThan(this.fieldKey())(control);
    }
}
