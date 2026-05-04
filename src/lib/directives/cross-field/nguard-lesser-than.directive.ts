import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardLesserThanDirective,
        },
    ],
    selector: '[nguardLesserThan]',
    standalone: true,
})
export class NguardLesserThanDirective implements Validator {
    public readonly fieldKey = input.required<string>({ alias: 'nguardLesserThan' });

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return CrossFieldValidators.lesserThan(this.fieldKey())(control);
    }
}
