import { Directive, input } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardMaxDirective,
        },
    ],
    selector: '[nguardMax]',
    standalone: true,
})
export class NguardMaxDirective implements Validator {
    public readonly maxVal = input.required<number>({ alias: 'nguardMax' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.max(this.maxVal())(control);
    }
}
