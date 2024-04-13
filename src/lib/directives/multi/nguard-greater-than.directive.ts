import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MultiValidators } from '../../validators/multi.validators';
import { NguardDifferentDirective } from './nguard-different.directive';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardGreaterThanDirective
  }],
  selector: '[nguardGreaterThan]',
  standalone: true
})
export class NguardGreaterThanDirective implements Validator {
  @Input() public compareFieldKey!: string;

  constructor() { }

  public validate(control: AbstractControl): ValidationErrors | null {
    return MultiValidators.greaterThan(this.compareFieldKey)(control);
  }

}
