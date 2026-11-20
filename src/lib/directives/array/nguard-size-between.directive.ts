import { Directive, input } from '@angular/core';
import { type AbstractControl, NG_VALIDATORS, type ValidationErrors, type Validator } from '@angular/forms';
import { ArrayValidators } from '../../validators/array.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardSizeBetweenDirective,
        },
    ],
    selector: '[nguardSizeBetween]',
    standalone: true,
})
export class NguardSizeBetweenDirective implements Validator {
    public readonly values = input.required<[number, number]>({ alias: 'nguardSizeBetween' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return ArrayValidators.sizeBetween(...this.values())(control);
    }
}
