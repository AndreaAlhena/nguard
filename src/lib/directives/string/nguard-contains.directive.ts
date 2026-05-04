import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Types
import { primitive } from '../../utils/validators.utils';

// Validators
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardContainsDirective,
        },
    ],
    selector: '[nguardContains]',
    standalone: true,
})
export class NguardContainsDirective implements Validator {
    public readonly values = input.required<primitive | primitive[]>({ alias: 'nguardContains' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const raw = this.values();
        const values = Array.isArray(raw) ? raw : [raw];
        return StringValidators.contains(...values)(control);
    }
}
