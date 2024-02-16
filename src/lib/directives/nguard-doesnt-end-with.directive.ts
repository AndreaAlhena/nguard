import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Validators
import { StringValidators } from '../validators/string.validators';

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
  @Input('nguardDoesntEndWith') public values!: string[];

  constructor() { }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return StringValidators.doesntEndWith(...this.values)(control);
  }
}
