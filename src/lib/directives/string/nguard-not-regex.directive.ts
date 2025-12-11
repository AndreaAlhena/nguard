import { Directive, Input } from '@angular/core';
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
    @Input('nguardNotRegex') public pattern!: RegExp;

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return StringValidators.notRegex(this.pattern)(control);
    }
}
