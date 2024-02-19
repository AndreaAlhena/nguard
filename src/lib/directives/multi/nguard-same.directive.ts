import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MultiValidators } from '../../validators/multi.validators';
import { IComparable } from '../../interfaces/comparable.interface';

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
  @Input('nguardSame') public config!: IComparable;

  constructor() { }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return MultiValidators.same(this.config.compareFieldKey, this.config.isStrict)(control);
  }
}
