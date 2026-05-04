import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Types
import { primitive } from '../../utils/validators.utils';

// Validators
import { MultiValidators } from '../../validators/multi.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardStartsWithDirective,
        },
    ],
    selector: '[nguardStartsWith]',
    standalone: true,
})
export class NguardStartsWithDirective implements Validator {
    public readonly values = input.required<primitive | primitive[]>({ alias: 'nguardStartsWith' });

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        const raw = this.values();
        const values = Array.isArray(raw) ? raw : [raw];
        return MultiValidators.startsWith(...values)(control);
    }
}
