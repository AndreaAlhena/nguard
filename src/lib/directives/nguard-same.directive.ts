import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { StringValidators } from '../validators/string.validators';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardSameDirective
  }],
  selector: '[nguardSame]',
  standalone: true
})
export class NguardSameDirective implements Validator {
  @Input('nguardSame') public controlKey!: string;

  constructor() { }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return StringValidators.same(this.controlKey)(control);
  }
}
