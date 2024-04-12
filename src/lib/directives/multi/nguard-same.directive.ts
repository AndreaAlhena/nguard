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
  @Input('nguardSame') public config!: string | IComparable;

  constructor() { }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const args: [string] | [string, boolean | undefined] = typeof this.config === 'string'
      ? [this.config]
      : [this.config.compareFieldKey, this.config.isStrict];

    return MultiValidators.same.apply(this, args)(control);
  }
}
