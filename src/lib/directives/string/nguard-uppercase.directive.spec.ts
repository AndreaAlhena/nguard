import { AbstractControl } from '@angular/forms';
import { createAbstractControlSpy } from '../../utils/test.utils';
import { NguardUppercaseDirective } from './nguard-uppercase.directive';

describe('NguardUppercaseDirective', () => {
  let control: AbstractControl;
  let directive: NguardUppercaseDirective;

  beforeEach(() => {
    directive = new NguardUppercaseDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a lowercase field', () => {
    control = createAbstractControlSpy('ABC');
    expect(directive.validate(control)).toBeNull();
  });

  it('should fail if the field is not lowercase', () => {
    control = createAbstractControlSpy('abc');
    expect(directive.validate(control)).toEqual({uppercase: true});
  });
});
