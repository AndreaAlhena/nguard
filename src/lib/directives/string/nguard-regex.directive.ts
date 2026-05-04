import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardRegexDirective,
        },
    ],
    selector: '[nguardRegex]',
    standalone: true,
})
export class NguardRegexDirective implements Validator {
    public readonly pattern = input.required<RegExp>({ alias: 'nguardRegex' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.regex(this.pattern())(control);
    }
}
