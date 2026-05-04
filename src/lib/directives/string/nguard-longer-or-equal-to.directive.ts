import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardLongerOrEqualToDirective,
        },
    ],
    selector: '[nguardLongerOrEqualTo]',
    standalone: true,
})
export class NguardLongerOrEqualToDirective implements Validator {
    public readonly fieldKey = input.required<string>({ alias: 'nguardLongerOrEqualTo' });

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return StringValidators.longerOrEqualTo(this.fieldKey())(control);
    }
}
