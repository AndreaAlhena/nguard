import { AbstractControl } from "@angular/forms";
import { NguardRangeDirective } from "./nguard-range.directive";

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
});
