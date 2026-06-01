import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardPostalCodeDirective,
        },
    ],
    selector: '[nguardPostalCode]',
    standalone: true,
})
export class NguardPostalCodeDirective implements Validator {
    public readonly country = input<string>('', { alias: 'nguardPostalCode' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.postalCode(this.country() || undefined)(control);
    }
}
