import { AbstractControl } from "@angular/forms";
import { NguardRangeDirective } from "./nguard-range.directive";
import { createAbstractControlSpy } from "../../utils/test.utils";

describe("NguardRangeDirective", () => {
  let control: AbstractControl;
  let directive: NguardRangeDirective;

  beforeEach(() => {
    directive = new NguardRangeDirective();
  });

  it("should create an instance", () => {
    const directive = new NguardRangeDirective();
    expect(directive).toBeTruthy();
  });

  it('Should validate a number in the given range', () => {
    control = createAbstractControlSpy(5);
    directive.values = [1, 5];

    expect(directive.validate(control)).toBeNull();
  });

  it('Should validate a number is not in the given range', () => {
    control = createAbstractControlSpy(7);
    directive.values = [1, 5];

    expect(directive.validate(control)).toEqual({range: true});
  });
});
