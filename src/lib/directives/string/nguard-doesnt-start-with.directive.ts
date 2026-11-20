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
      useExisting: NguardDoesntStartWithDirective,
    },
  ],
  selector: '[nguardDoesntStartWith]',
  standalone: true,
})
export class NguardDoesntStartWithDirective implements Validator {
  public readonly values = input.required<primitive | primitive[]>({
    alias: 'nguardDoesntStartWith',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    const raw = this.values();
    const values = Array.isArray(raw) ? raw : [raw];
    return StringValidators.doesntStartWith(...values)(control);
  }
}
