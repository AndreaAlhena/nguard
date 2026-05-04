import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Types
import { CharsetConfig } from '../../types/charset-config.type';

// Validators
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardAlphaNumDirective,
        },
    ],
    selector: '[nguardAlphaNum]',
    standalone: true,
})
export class NguardAlphaNumDirective implements Validator {
    @Input('nguardAlphaNum') public config!: CharsetConfig;

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return StringValidators.alphaNum(this.config?.hasAsciiOnly)(control);
    }
}
