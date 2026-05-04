import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardGreaterThanOrEqualDirective,
        },
    ],
    selector: '[nguardGreaterThanOrEqual]',
    standalone: true,
})
export class NguardGreaterThanOrEqualDirective implements Validator {
    public readonly fieldKey = input.required<string>({ alias: 'nguardGreaterThanOrEqual' });

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return CrossFieldValidators.greaterThanOrEqual(this.fieldKey())(control);
    }
}
