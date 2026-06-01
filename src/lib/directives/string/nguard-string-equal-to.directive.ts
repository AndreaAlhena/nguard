import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardStringEqualToDirective,
        },
    ],
    selector: '[nguardStringEqualTo]',
    standalone: true,
})
export class NguardStringEqualToDirective implements Validator {
    public readonly value = input.required<string>({ alias: 'nguardStringEqualTo' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.equalTo(this.value())(control);
    }
}
