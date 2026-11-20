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
      useExisting: NguardAsciiDirective,
    },
  ],
  selector: '[nguardAscii]',
  standalone: true,
})
export class NguardAsciiDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return StringValidators.ascii(control);
  }
}
