import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Types
import { primitive } from '../../utils/validators.utils';

// Validators
import { MultiValidators } from '../../validators/multi.validators';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardDoesntStartWithDirective
  }],
  selector: '[nguardDoesntStartWith]',
  standalone: true
})
export class NguardDoesntStartWithDirective implements Validator {
  @Input('nguardDoesntStartWith') public values!: primitive | primitive[];

  constructor() { }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const values = Array.isArray(this.values) ? this.values : [this.values];
    return MultiValidators.doesntStartWith(...values)(control);
  }
}
