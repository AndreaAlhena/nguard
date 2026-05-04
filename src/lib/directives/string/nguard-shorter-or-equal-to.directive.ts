import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardShorterOrEqualToDirective,
        },
    ],
    selector: '[nguardShorterOrEqualTo]',
    standalone: true,
})
export class NguardShorterOrEqualToDirective implements Validator {
    public readonly fieldKey = input.required<string>({ alias: 'nguardShorterOrEqualTo' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.shorterOrEqualTo(this.fieldKey())(control);
    }
}
