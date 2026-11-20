import { Directive, input } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';

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
  public readonly fieldKey = input.required<string>({
    alias: 'nguardConfirmed',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    return CrossFieldValidators.confirmed(this.fieldKey())(control);
  }
}
