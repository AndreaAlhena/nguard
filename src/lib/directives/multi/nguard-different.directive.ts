import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Interfaces
import { IComparable } from '../../interfaces/comparable.interface';

// Validators
import { MultiValidators } from '../../validators/multi.validators';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardDifferentDirective
  }],
  selector: '[nguardDifferent]',
  standalone: true
})
export class NguardDifferentDirective implements Validator {
  @Input('nguardDifferent') public config!: IComparable;

  constructor() { }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return MultiValidators.different(this.config.compareFieldKey, this.config.isStrict)(control);
  }
}
