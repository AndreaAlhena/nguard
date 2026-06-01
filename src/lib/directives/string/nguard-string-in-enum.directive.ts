import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardStringInEnumDirective,
        },
    ],
    selector: '[nguardStringInEnum]',
    standalone: true,
})
export class NguardStringInEnumDirective implements Validator {
    public readonly enumObject = input.required<Record<string, string | number>>({ alias: 'nguardStringInEnum' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.inEnum(this.enumObject())(control);
    }
}
