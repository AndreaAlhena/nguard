import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { IAlphaDirectiveConfig } from '../interfaces/alpha-directive-config.interface';
import { StringValidators } from '../validators/string.validators';

@Directive({
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NguardAlphaDirective,
    multi: true
  }],
  selector: '[libNguardAlpha]',
  standalone: true
})
export class NguardAlphaDirective implements Validator {
  @Input('libNguardAlpha') public config!: IAlphaDirectiveConfig;

  constructor() { }
  
  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return StringValidators.alpha(this.config?.hasAsciiOnly)(control);
  }
}
