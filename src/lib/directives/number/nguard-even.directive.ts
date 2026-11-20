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
      useExisting: NguardEvenDirective,
    },
  ],
  selector: '[nguardEven]',
  standalone: true,
})
export class NguardEvenDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return NumberValidators.even(control);
  }
}
