import { Directive, input } from '@angular/core';
import {
  type AbstractControl,
  NG_VALIDATORS,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';
import { CrossFieldValidators } from '../../validators/cross-field.validators';
import type { FieldConditionConfig } from '../../types/field-condition-config.type';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: NguardProhibitedIfDirective,
    },
  ],
  selector: '[nguardProhibitedIf]',
  standalone: true,
})
export class NguardProhibitedIfDirective implements Validator {
  public readonly config = input.required<string | FieldConditionConfig>({
    alias: 'nguardProhibitedIf',
  });

  public validate(control: AbstractControl): ValidationErrors | null {
    const cfg = this.config();
    const fieldKey = typeof cfg === 'string' ? cfg : cfg.fieldKey;
    const isStrict = typeof cfg === 'string' ? undefined : cfg.isStrict;
    const value = typeof cfg === 'string' ? undefined : cfg.value;

    return CrossFieldValidators.prohibitedIf(
      fieldKey,
      value,
      isStrict,
    )(control);
  }
}
