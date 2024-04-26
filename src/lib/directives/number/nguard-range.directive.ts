import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { NumberValidators } from "../../validators/number.validators";

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: NguardRangeDirective
  }],
  selector: "[nguardRange]",
  standalone: true,
})
export class NguardRangeDirective implements Validator {
  @Input('nguardRange') public values!: [number, number];

  constructor() {}

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return NumberValidators.range(...this.values)(control);
  }
}
