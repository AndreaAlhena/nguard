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
            useExisting: NguardAlphaDashDirective,
        },
    ],
    selector: '[nguardAlphaDash]',
    standalone: true,
})
export class NguardAlphaDashDirective implements Validator {
    @Input('nguardAlphaDash') public config!: CharsetConfig;

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return StringValidators.alphaDash(this.config?.hasAsciiOnly)(control);
    }
}
