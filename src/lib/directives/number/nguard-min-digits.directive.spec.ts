import type { AbstractControl } from '@angular/forms';
import { NguardMinDigitsDirective } from './nguard-min-digits.directive';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardMinDigitsDirective', () => {
  let control: AbstractControl;
  let directive: NguardMinDigitsDirective;

  beforeEach(() => {
    ({ directive } = createDirectiveFixture(
      NguardMinDigitsDirective,
      '<div [nguardMinDigits]="$any(value)"></div>',
      3,
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate when digit count meets the minimum', () => {
    control = createAbstractControlSpy(123);

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate when digit count exceeds the minimum', () => {
    control = createAbstractControlSpy(123456);

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail when digit count is below the minimum', () => {
    control = createAbstractControlSpy(12);

    expect(directive.validate(control)).toEqual({ minDigits: true });
  });
});
