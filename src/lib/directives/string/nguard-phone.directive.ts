import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardPhoneDirective,
        },
    ],
    selector: '[nguardPhone]',
    standalone: true,
})
export class NguardPhoneDirective implements Validator {
    public readonly country = input<string>('', { alias: 'nguardPhone' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.phone(this.country() || undefined)(control);
    }
}
