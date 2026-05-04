import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MultiValidators } from '../../validators/multi.validators';

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
        return MultiValidators.lesserThanOrEqual(this.fieldKey())(control);
    }
}
