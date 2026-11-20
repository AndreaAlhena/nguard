import type { AbstractControl } from '@angular/forms';
import { NguardHexColorDirective } from './nguard-hex-color.directive';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardHexColorDirective', () => {
  let control: AbstractControl;
  let directive: NguardHexColorDirective;

  beforeEach(() => {
    ({ directive } = createDirectiveFixture(
      NguardHexColorDirective,
      '<div nguardHexColor></div>',
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a #ffffff hex color', () => {
    control = createAbstractControlSpy('#ffffff');

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a #fff short hex color', () => {
    control = createAbstractControlSpy('#fff');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail on an invalid hex color', () => {
    control = createAbstractControlSpy('red');

    expect(directive.validate(control)).toEqual({ hexColor: true });
  });
});
