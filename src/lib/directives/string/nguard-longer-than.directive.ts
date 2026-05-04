import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardLongerThanDirective,
        },
    ],
    selector: '[nguardLongerThan]',
    standalone: true,
})
export class NguardLongerThanDirective implements Validator {
    public readonly fieldKey = input.required<string>({ alias: 'nguardLongerThan' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.longerThan(this.fieldKey())(control);
    }
}
