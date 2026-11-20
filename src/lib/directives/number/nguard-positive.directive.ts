import { Directive } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';
import { NumberValidators } from '../../validators/number.validators';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardPositiveDirective,
    },
  ],
  selector: '[nguardPositive]',
  standalone: true,
})
export class NguardPositiveDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return NumberValidators.positive(control);
  }
}
