import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardDecimalDirective,
        },
    ],
    selector: '[nguardDecimal]',
    standalone: true,
})
export class NguardDecimalDirective implements Validator {
    public readonly places = input.required<number | [number, number]>({ alias: 'nguardDecimal' });

    public validate(control: AbstractControl): ValidationErrors | null {
        const v = this.places();
        if (Array.isArray(v)) {
            return NumberValidators.decimal(v[0], v[1])(control);
        }
        return NumberValidators.decimal(v)(control);
    }
}
