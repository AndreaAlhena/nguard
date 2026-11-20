import type { AbstractControl } from '@angular/forms';
import { NguardMaxDigitsDirective } from './nguard-max-digits.directive';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardMaxDigitsDirective', () => {
  let control: AbstractControl;
  let directive: NguardMaxDigitsDirective;

  beforeEach(() => {
    ({ directive } = createDirectiveFixture(
      NguardMaxDigitsDirective,
      '<div [nguardMaxDigits]="$any(value)"></div>',
      5,
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate when digit count is at the maximum', () => {
    control = createAbstractControlSpy(12345);

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate when digit count is below the maximum', () => {
    control = createAbstractControlSpy(123);

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail when digit count exceeds the maximum', () => {
    control = createAbstractControlSpy(123456);

    expect(directive.validate(control)).toEqual({ maxDigits: true });
  });
});
