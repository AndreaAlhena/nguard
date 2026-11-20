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
      useExisting: NguardStringDirective,
    },
  ],
  selector: '[nguardString]',
  standalone: true,
})
export class NguardStringDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return StringValidators.string(control);
  }
}
