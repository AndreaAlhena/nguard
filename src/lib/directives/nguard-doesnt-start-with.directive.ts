import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Validators
import { StringValidators } from '../validators/string.validators';

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
  @Input('nguardDoesntStartWith') public values!: string[];

  constructor() { }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return StringValidators.doesntStartWith(...this.values)(control);
  }
}
