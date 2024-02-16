import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Interfaces
import { IAlphaNumDirectiveConfig } from '../interfaces/alpha-num-directive-config.interface';

// Validators
import { StringValidators } from '../validators/string.validators';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardAlphaNumDirective
  }],
  selector: '[nguardAlphaNum]',
  standalone: true
})
export class NguardAlphaNumDirective implements Validator {
  @Input('nguardAlphaNum') public config!: IAlphaNumDirectiveConfig;

  constructor() { }
  
  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return StringValidators.alphaNum(this.config?.hasAsciiOnly)(control);
  }
}
