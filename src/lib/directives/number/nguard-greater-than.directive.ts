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
      useExisting: NguardGreaterThanDirective,
    },
  ],
  selector: '[nguardGreaterThan]',
  standalone: true,
})
export class NguardGreaterThanDirective implements Validator {
  public readonly fieldKey = input.required<string>({
    alias: 'nguardGreaterThan',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    return NumberValidators.greaterThan(this.fieldKey())(control);
  }
}
