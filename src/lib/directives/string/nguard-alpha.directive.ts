import { Directive, input } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';

// Types
import type { CharsetConfig } from '../../types/charset-config.type';

// Validators
import { StringValidators } from '../../validators/string.validators';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardAlphaDirective,
    },
  ],
  selector: '[nguardAlpha]',
  standalone: true,
})
export class NguardAlphaDirective implements Validator {
  public readonly config = input<CharsetConfig | undefined>(undefined, {
    alias: 'nguardAlpha',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    return StringValidators.alpha(this.config()?.hasAsciiOnly)(control);
  }
}
