import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardLesserThanOrEqualDirective,
        },
    ],
    selector: '[nguardLesserThanOrEqual]',
    standalone: true,
})
export class NguardLesserThanOrEqualDirective implements Validator {
    public readonly fieldKey = input.required<string>({ alias: 'nguardLesserThanOrEqual' });

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return CrossFieldValidators.lesserThanOrEqual(this.fieldKey())(control);
    }
}
