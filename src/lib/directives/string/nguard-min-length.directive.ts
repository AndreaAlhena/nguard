import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardMinLengthDirective,
        },
    ],
    selector: '[nguardMinLength]',
    standalone: true,
})
export class NguardMinLengthDirective implements Validator {
    public readonly minLength = input.required<number>({ alias: 'nguardMinLength' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.minLength(this.minLength())(control);
    }
}
