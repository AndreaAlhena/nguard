import type { AbstractControl } from '@angular/forms';
import { NguardStringNotInListDirective } from './nguard-string-not-in-list.directive';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardStringNotInListDirective', () => {
  let control: AbstractControl;
  let directive: NguardStringNotInListDirective;

  beforeEach(() => {
    ({ directive } = createDirectiveFixture(
      NguardStringNotInListDirective,
      '<div [nguardStringNotInList]="$any(value)"></div>',
      ['admin', 'root'],
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should pass when the value is not in the list', () => {
    control = createAbstractControlSpy('user');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail when the value is in the list', () => {
    control = createAbstractControlSpy('admin');

    expect(directive.validate(control)).toEqual({ notInList: true });
  });
});
