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
      useExisting: NguardGreaterThanOrEqualDirective,
    },
  ],
  selector: '[nguardGreaterThanOrEqual]',
  standalone: true,
})
export class NguardGreaterThanOrEqualDirective implements Validator {
  public readonly fieldKey = input.required<string>({
    alias: 'nguardGreaterThanOrEqual',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    return NumberValidators.greaterThanOrEqual(this.fieldKey())(control);
  }
}
