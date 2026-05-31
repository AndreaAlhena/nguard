import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ArrayValidators } from '../../validators/array.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardRequiredArrayKeysDirective,
        },
    ],
    selector: '[nguardRequiredArrayKeys]',
    standalone: true,
})
export class NguardRequiredArrayKeysDirective implements Validator {
    public readonly keys = input.required<string | string[]>({ alias: 'nguardRequiredArrayKeys' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.keys();
        const keys = Array.isArray(cfg) ? cfg : [cfg];

        return ArrayValidators.requiredArrayKeys(...keys)(control);
    }
}
