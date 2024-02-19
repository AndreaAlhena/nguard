import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Validators
import { StringValidators } from '../validators/string.validators';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardStartsWithDirective
  }],
  selector: '[nguardStartsWith]',
  standalone: true
})
export class NguardStartsWithDirective implements Validator {
  @Input('nguardStartsWith') public values!: string[];

  constructor() { }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return StringValidators.startsWith(...this.values)(control);
  }
}
