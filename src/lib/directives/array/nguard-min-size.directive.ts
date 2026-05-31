import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ArrayValidators } from '../../validators/array.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardMinSizeDirective,
        },
    ],
    selector: '[nguardMinSize]',
    standalone: true,
})
export class NguardMinSizeDirective implements Validator {
    public readonly min = input.required<number>({ alias: 'nguardMinSize' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return ArrayValidators.minSize(this.min())(control);
    }
}
