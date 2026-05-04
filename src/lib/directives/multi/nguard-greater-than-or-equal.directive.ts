import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MultiValidators } from '../../validators/multi.validators';

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
        return MultiValidators.greaterThanOrEqual(this.fieldKey())(control);
    }
}
