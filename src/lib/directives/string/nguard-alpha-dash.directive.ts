import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Interfaces
import { IAlphaDashDirectiveConfig } from '../../interfaces/alpha-dash-directive-config.interface';

// Validators
import { StringValidators } from '../../validators/string.validators';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardAlphaDashDirective
  }],
  selector: '[nguardAlphaDash]',
  standalone: true
})
export class NguardAlphaDashDirective implements Validator {
  @Input('nguardAlphaDash') public config!: IAlphaDashDirectiveConfig;

  constructor() { }
  
  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return StringValidators.alphaDash(this.config?.hasAsciiOnly)(control);
  }
}