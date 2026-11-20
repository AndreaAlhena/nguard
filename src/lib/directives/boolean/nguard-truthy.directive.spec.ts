import type { AbstractControl } from '@angular/forms';
import { NguardTruthyDirective } from './nguard-truthy.directive';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardTruthyDirective', () => {
  let control: AbstractControl;
  let directive: NguardTruthyDirective;

  beforeEach(() => {
    ({ directive } = createDirectiveFixture(
      NguardTruthyDirective,
      '<div nguardTruthy></div>',
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate true', () => {
    control = createAbstractControlSpy(true);

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a non empty string', () => {
    control = createAbstractControlSpy('hello');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail on false', () => {
    control = createAbstractControlSpy(false);

    expect(directive.validate(control)).toEqual({ truthy: true });
  });

  it('should fail on null', () => {
    control = createAbstractControlSpy(null);

    expect(directive.validate(control)).toEqual({ truthy: true });
  });

  it('should fail on the number zero', () => {
    control = createAbstractControlSpy(0);

    expect(directive.validate(control)).toEqual({ truthy: true });
  });
});
