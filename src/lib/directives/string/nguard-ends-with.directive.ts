import { Directive, input } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';

// Types
import type { primitive } from '../../types/primitive.type';

// Validators
import { StringValidators } from '../../validators/string.validators';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardEndsWithDirective,
    },
  ],
  selector: '[nguardEndsWith]',
  standalone: true,
})
export class NguardEndsWithDirective implements Validator {
  public readonly values = input.required<primitive | primitive[]>({
    alias: 'nguardEndsWith',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    const raw = this.values();
    const values = Array.isArray(raw) ? raw : [raw];
    return StringValidators.endsWith(...values)(control);
  }
}
