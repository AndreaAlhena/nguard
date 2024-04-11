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
    useExisting: NguardDoesntEndWithDirective
  }],
  selector: '[nguardDoesntEndWith]',
  standalone: true
})
export class NguardDoesntEndWithDirective implements Validator {
  @Input('nguardDoesntEndWith') public values!: primitive | primitive[];

  constructor() { }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const values = Array.isArray(this.values) ? this.values : [this.values];
    return MultiValidators.doesntEndWith(...values)(control);
  }
}
