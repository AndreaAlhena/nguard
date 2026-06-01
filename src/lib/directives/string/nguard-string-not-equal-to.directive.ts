import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardStringNotEqualToDirective,
        },
    ],
    selector: '[nguardStringNotEqualTo]',
    standalone: true,
})
export class NguardStringNotEqualToDirective implements Validator {
    public readonly value = input.required<string>({ alias: 'nguardStringNotEqualTo' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.notEqualTo(this.value())(control);
    }
}
