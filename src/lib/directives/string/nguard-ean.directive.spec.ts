import type { AbstractControl } from '@angular/forms';
import { NguardEanDirective } from './nguard-ean.directive';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardEanDirective', () => {
  let control: AbstractControl;
  let directive: NguardEanDirective;

  beforeEach(() => {
    ({ directive } = createDirectiveFixture(
      NguardEanDirective,
      '<div nguardEan></div>',
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate an EAN-13', () => {
    control = createAbstractControlSpy('4006381333931');

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate an EAN-8', () => {
    control = createAbstractControlSpy('73513537');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail an invalid check digit', () => {
    control = createAbstractControlSpy('4006381333932');

    expect(directive.validate(control)).toEqual({ ean: true });
  });
});
