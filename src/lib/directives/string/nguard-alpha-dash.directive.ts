import { Directive, input } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';
import type { CharsetConfig } from '../../types/charset-config.type';
import { StringValidators } from '../../validators/string.validators';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardAlphaDashDirective,
    },
  ],
  selector: '[nguardAlphaDash]',
  standalone: true,
})
export class NguardAlphaDashDirective implements Validator {
  public readonly config = input<CharsetConfig | undefined>(undefined, {
    alias: 'nguardAlphaDash',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    return StringValidators.alphaDash(this.config()?.hasAsciiOnly)(control);
  }
}
