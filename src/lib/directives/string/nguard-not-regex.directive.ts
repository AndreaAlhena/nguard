import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardNotRegexDirective,
        },
    ],
    selector: '[nguardNotRegex]',
    standalone: true,
})
export class NguardNotRegexDirective implements Validator {
    public readonly pattern = input.required<RegExp>({ alias: 'nguardNotRegex' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.notRegex(this.pattern())(control);
    }
}
