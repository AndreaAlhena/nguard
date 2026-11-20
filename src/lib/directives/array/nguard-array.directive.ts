import { Directive } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';
import { ArrayValidators } from '../../validators/array.validators';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardArrayDirective,
    },
  ],
  selector: '[nguardArray]',
  standalone: true,
})
export class NguardArrayDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return ArrayValidators.array(control);
  }
}
