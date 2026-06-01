import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardVatNumberDirective,
        },
    ],
    selector: '[nguardVatNumber]',
    standalone: true,
})
export class NguardVatNumberDirective implements Validator {
    public readonly country = input<string>('', { alias: 'nguardVatNumber' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.vatNumber(this.country() || undefined)(control);
    }
}
