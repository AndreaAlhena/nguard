import type { AbstractControl } from '@angular/forms';
import { NguardStringInEnumDirective } from './nguard-string-in-enum.directive';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

enum Status {
  Draft = 'draft',
  Published = 'published',
}

describe('NguardStringInEnumDirective', () => {
  let control: AbstractControl;
  let directive: NguardStringInEnumDirective;

  beforeEach(() => {
    ({ directive } = createDirectiveFixture(
      NguardStringInEnumDirective,
      '<div [nguardStringInEnum]="$any(value)"></div>',
      Status,
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should pass when the value is an enum value', () => {
    control = createAbstractControlSpy('draft');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail when the value is not an enum value', () => {
    control = createAbstractControlSpy('archived');

    expect(directive.validate(control)).toEqual({ inEnum: true });
  });
});
