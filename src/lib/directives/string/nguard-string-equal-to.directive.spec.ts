import type { AbstractControl } from '@angular/forms';
import { NguardStringEqualToDirective } from './nguard-string-equal-to.directive';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardStringEqualToDirective', () => {
  let control: AbstractControl;
  let directive: NguardStringEqualToDirective;

  beforeEach(() => {
    ({ directive } = createDirectiveFixture(
      NguardStringEqualToDirective,
      '<div [nguardStringEqualTo]="$any(value)"></div>',
      'expected',
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should pass when equal', () => {
    control = createAbstractControlSpy('expected');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail when not equal', () => {
    control = createAbstractControlSpy('other');

    expect(directive.validate(control)).toEqual({ equalTo: true });
  });
});
