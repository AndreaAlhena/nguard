import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MultiValidators } from '../../validators/multi.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: NguardConfirmedDirective,
        },
    ],
    selector: '[nguardConfirmed]',
    standalone: true,
})
export class NguardConfirmedDirective implements Validator {
    @Input('nguardConfirmed') public fieldKey!: string;

    constructor() {}

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return MultiValidators.confirmed(this.fieldKey)(control);
    }
}
