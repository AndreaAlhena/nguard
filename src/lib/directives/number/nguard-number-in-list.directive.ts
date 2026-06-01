import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardNumberInListDirective,
        },
    ],
    selector: '[nguardNumberInList]',
    standalone: true,
})
export class NguardNumberInListDirective implements Validator {
    public readonly values = input.required<number | number[]>({ alias: 'nguardNumberInList' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const cfg = this.values();
        const values = Array.isArray(cfg) ? cfg : [cfg];

        return NumberValidators.inList(...values)(control);
    }
}
