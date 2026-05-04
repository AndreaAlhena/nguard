import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardLengthDirective,
        },
    ],
    selector: '[nguardLength]',
    standalone: true,
})
export class NguardLengthDirective implements Validator {
    public readonly length = input.required<number>({ alias: 'nguardLength' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.length(this.length())(control);
    }
}
