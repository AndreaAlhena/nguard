import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardStringInListDirective,
        },
    ],
    selector: '[nguardStringInList]',
    standalone: true,
})
export class NguardStringInListDirective implements Validator {
    public readonly values = input.required<string | string[]>({ alias: 'nguardStringInList' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.values();
        const values = Array.isArray(cfg) ? cfg : [cfg];

        return StringValidators.inList(...values)(control);
    }
}
