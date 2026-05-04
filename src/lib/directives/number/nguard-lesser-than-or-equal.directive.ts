import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

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

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.lesserThanOrEqual(this.fieldKey())(control);
    }
}
