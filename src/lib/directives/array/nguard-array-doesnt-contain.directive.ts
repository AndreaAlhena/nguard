import { Directive, input } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';
import { ArrayValidators } from '../../validators/array.validators';
import type { primitive } from '../../types/primitive.type';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardArrayDoesntContainDirective,
    },
  ],
  selector: '[nguardArrayDoesntContain]',
  standalone: true,
})
export class NguardArrayDoesntContainDirective implements Validator {
  public readonly values = input.required<primitive | primitive[]>({
    alias: 'nguardArrayDoesntContain',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    const cfg = this.values();
    const values = Array.isArray(cfg) ? cfg : [cfg];

    return ArrayValidators.doesntContain(...values)(control);
  }
}
