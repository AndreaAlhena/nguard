import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MultiValidators } from '../../validators/multi.validators';

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
        return MultiValidators.greaterThan(this.fieldKey())(control);
    }
}
