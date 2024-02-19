import { AbstractControl } from '@angular/forms';
import { createAbstractControlSpy } from '../utils/test.utils';
import { NguardLowercaseDirective } from './nguard-lowercase.directive';

describe('NguardLowercaseDirective', () => {
  let control: AbstractControl;
  let directive: NguardLowercaseDirective;

  beforeEach(() => {
    directive = new NguardLowercaseDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a lowercase field', () => {
    control = createAbstractControlSpy('abc');
    expect(directive.validate(control)).toBeNull();
  });

  it('should fail if the field is not lowercase', () => {
    control = createAbstractControlSpy('ABC');
    expect(directive.validate(control)).toEqual({lowercase: true});
  });
});
