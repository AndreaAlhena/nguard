import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Validators
import { StringValidators } from '../validators/string.validators';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardEndsWithDirective
  }],
  selector: '[nguardEndsWith]',
  standalone: true
})
export class NguardEndsWithDirective implements Validator {
  @Input('nguardEndsWith') public values!: string[];

  constructor() { }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return StringValidators.endsWith(...this.values)(control);
  }
}
