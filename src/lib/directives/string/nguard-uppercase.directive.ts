import { Directive } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';
import { StringValidators } from '../../validators/string.validators';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardUppercaseDirective,
    },
  ],
  selector: '[nguardUppercase]',
  standalone: true,
})
export class NguardUppercaseDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return StringValidators.uppercase(control);
  }
}
