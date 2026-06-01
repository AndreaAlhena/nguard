import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardNumberInEnumDirective,
        },
    ],
    selector: '[nguardNumberInEnum]',
    standalone: true,
})
export class NguardNumberInEnumDirective implements Validator {
    public readonly enumObject = input.required<Record<string, string | number>>({ alias: 'nguardNumberInEnum' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return NumberValidators.inEnum(this.enumObject())(control);
    }
}
