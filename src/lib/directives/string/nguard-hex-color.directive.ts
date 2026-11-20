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
      useExisting: NguardHexColorDirective,
    },
  ],
  selector: '[nguardHexColor]',
  standalone: true,
})
export class NguardHexColorDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return StringValidators.hexColor(control);
  }
}
