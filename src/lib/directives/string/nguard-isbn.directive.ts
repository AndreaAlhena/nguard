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
      useExisting: NguardIsbnDirective,
    },
  ],
  selector: '[nguardIsbn]',
  standalone: true,
})
export class NguardIsbnDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return StringValidators.isbn(control);
  }
}
