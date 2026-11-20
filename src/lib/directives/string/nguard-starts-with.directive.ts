import { Directive, input } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';
import type { primitive } from '../../types/primitive.type';
import { StringValidators } from '../../validators/string.validators';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardStartsWithDirective,
    },
  ],
  selector: '[nguardStartsWith]',
  standalone: true,
})
export class NguardStartsWithDirective implements Validator {
  public readonly values = input.required<primitive | primitive[]>({
    alias: 'nguardStartsWith',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    const raw = this.values();
    const values = Array.isArray(raw) ? raw : [raw];
    return StringValidators.startsWith(...values)(control);
  }
}
