import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Interfaces
import { IAlphaDirectiveConfig } from '../interfaces/alpha-directive-config.interface';

// Validators
import { StringValidators } from '../validators/string.validators';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardAlphaDirective
  }],
  selector: '[nguardAlpha]',
  standalone: true
})
export class NguardAlphaDirective implements Validator {
  @Input('nguardAlpha') public config!: IAlphaDirectiveConfig;

  constructor() { }
  
  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return StringValidators.alpha(this.config?.hasAsciiOnly)(control);
  }
}
