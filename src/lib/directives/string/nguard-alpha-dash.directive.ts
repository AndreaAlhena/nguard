import { Directive, input } from '@angular/core';
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
    public readonly config = input<CharsetConfig | undefined>(undefined, { alias: 'nguardAlphaDash' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.alphaDash(this.config()?.hasAsciiOnly)(control);
    }
}
