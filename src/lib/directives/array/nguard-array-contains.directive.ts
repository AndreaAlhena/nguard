import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ArrayValidators } from '../../validators/array.validators';
import { primitive } from '../../utils/validators.utils';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardArrayContainsDirective,
        },
    ],
    selector: '[nguardArrayContains]',
    standalone: true,
})
export class NguardArrayContainsDirective implements Validator {
    public readonly values = input.required<primitive | primitive[]>({ alias: 'nguardArrayContains' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.values();
        const values = Array.isArray(cfg) ? cfg : [cfg];

        return ArrayValidators.contains(...values)(control);
    }
}
