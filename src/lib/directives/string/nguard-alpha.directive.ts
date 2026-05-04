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
            useExisting: NguardAlphaDirective,
        },
    ],
    selector: '[nguardAlpha]',
    standalone: true,
})
export class NguardAlphaDirective implements Validator {
    public readonly config = input<CharsetConfig | undefined>(undefined, { alias: 'nguardAlpha' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.alpha(this.config()?.hasAsciiOnly)(control);
    }
}
