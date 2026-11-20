import { Directive, input } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';
import { BooleanValidators } from '../../validators/boolean.validators';
import type { FieldConditionConfig } from '../../types/field-condition-config.type';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardAcceptedIfDirective,
    },
  ],
  selector: '[nguardAcceptedIf]',
  standalone: true,
})
export class NguardAcceptedIfDirective implements Validator {
  public readonly config = input.required<string | FieldConditionConfig>({
    alias: 'nguardAcceptedIf',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    const cfg = this.config();
    const fieldKey = typeof cfg === 'string' ? cfg : cfg.fieldKey;
    const isStrict = typeof cfg === 'string' ? undefined : cfg.isStrict;
    const value = typeof cfg === 'string' ? undefined : cfg.value;

    return BooleanValidators.acceptedIf(fieldKey, value, isStrict)(control);
  }
}
