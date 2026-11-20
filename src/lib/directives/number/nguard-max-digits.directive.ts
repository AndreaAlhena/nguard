import { Directive, input } from '@angular/core';
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
      useExisting: NguardMaxDigitsDirective,
    },
  ],
  selector: '[nguardMaxDigits]',
  standalone: true,
})
export class NguardMaxDigitsDirective implements Validator {
  public readonly maxDigits = input.required<number>({
    alias: 'nguardMaxDigits',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    return NumberValidators.maxDigits(this.maxDigits())(control);
  }
}
