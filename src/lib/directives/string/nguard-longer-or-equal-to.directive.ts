import { Directive, input } from '@angular/core';
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
      useExisting: NguardLongerOrEqualToDirective,
    },
  ],
  selector: '[nguardLongerOrEqualTo]',
  standalone: true,
})
export class NguardLongerOrEqualToDirective implements Validator {
  public readonly fieldKey = input.required<string>({
    alias: 'nguardLongerOrEqualTo',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    return StringValidators.longerOrEqualTo(this.fieldKey())(control);
  }
}
