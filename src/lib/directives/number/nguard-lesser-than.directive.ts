import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

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

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.lesserThan(this.fieldKey())(control);
    }
}
