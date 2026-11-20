import type { AbstractControl } from '@angular/forms';
import { NguardMultipleOfDirective } from './nguard-multiple-of.directive';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardMultipleOfDirective', () => {
  let control: AbstractControl;
  let directive: NguardMultipleOfDirective;

  beforeEach(() => {
    ({ directive } = createDirectiveFixture(
      NguardMultipleOfDirective,
      '<div [nguardMultipleOf]="$any(value)"></div>',
      5,
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a multiple', () => {
    control = createAbstractControlSpy(15);

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail on a non-multiple', () => {
    control = createAbstractControlSpy(7);

    expect(directive.validate(control)).toEqual({ multipleOf: true });
  });
});
