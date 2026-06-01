import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardNumberNotInListDirective,
        },
    ],
    selector: '[nguardNumberNotInList]',
    standalone: true,
})
export class NguardNumberNotInListDirective implements Validator {
    public readonly values = input.required<number | number[]>({ alias: 'nguardNumberNotInList' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.values();
        const values = Array.isArray(cfg) ? cfg : [cfg];

        return NumberValidators.notInList(...values)(control);
    }
}
