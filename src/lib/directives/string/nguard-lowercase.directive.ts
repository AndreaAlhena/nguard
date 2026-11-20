import { Directive } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';

// Validators
import { StringValidators } from '../../validators/string.validators';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardLowercaseDirective,
    },
  ],
  selector: '[nguardLowercase]',
  standalone: true,
})
export class NguardLowercaseDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return StringValidators.lowercase(control);
  }
}
