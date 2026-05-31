import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ArrayValidators } from '../../validators/array.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardMaxSizeDirective,
        },
    ],
    selector: '[nguardMaxSize]',
    standalone: true,
})
export class NguardMaxSizeDirective implements Validator {
    public readonly max = input.required<number>({ alias: 'nguardMaxSize' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return ArrayValidators.maxSize(this.max())(control);
    }
}
