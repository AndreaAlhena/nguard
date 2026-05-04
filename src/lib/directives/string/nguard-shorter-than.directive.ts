import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardShorterThanDirective,
        },
    ],
    selector: '[nguardShorterThan]',
    standalone: true,
})
export class NguardShorterThanDirective implements Validator {
    public readonly fieldKey = input.required<string>({ alias: 'nguardShorterThan' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.shorterThan(this.fieldKey())(control);
    }
}
