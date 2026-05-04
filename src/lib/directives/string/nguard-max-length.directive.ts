import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardMaxLengthDirective,
        },
    ],
    selector: '[nguardMaxLength]',
    standalone: true,
})
export class NguardMaxLengthDirective implements Validator {
    public readonly maxLength = input.required<number>({ alias: 'nguardMaxLength' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.maxLength(this.maxLength())(control);
    }
}
