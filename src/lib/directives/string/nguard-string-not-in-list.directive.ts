import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardStringNotInListDirective,
        },
    ],
    selector: '[nguardStringNotInList]',
    standalone: true,
})
export class NguardStringNotInListDirective implements Validator {
    public readonly values = input.required<string | string[]>({ alias: 'nguardStringNotInList' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.values();
        const values = Array.isArray(cfg) ? cfg : [cfg];

        return StringValidators.notInList(...values)(control);
    }
}
