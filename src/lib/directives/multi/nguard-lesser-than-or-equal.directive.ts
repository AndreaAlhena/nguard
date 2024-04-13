import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MultiValidators } from '../../validators/multi.validators';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardLesserThanOrEqualDirective
  }],
  selector: '[nguardLesserThanOrEqual]',
  standalone: true
})
export class NguardLesserThanOrEqualDirective implements Validator {
  @Input() public compareFieldKey!: string;

  constructor() { }

  public validate(control: AbstractControl): ValidationErrors | null {
    return MultiValidators.lesserThanOrEqual(this.compareFieldKey)(control);
  }

}
