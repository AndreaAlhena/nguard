import { AbstractControl } from '@angular/forms';
import { NguardDoesntEndWithDirective } from './nguard-doesnt-end-with.directive';
import { createAbstractControlSpy } from '../utils/test.utils';

describe('NguardDoesntEndWithDirective', () => {
  let control: AbstractControl;
  let directive: NguardDoesntEndWithDirective;

  beforeEach(() => {
    directive = new NguardDoesntEndWithDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a field that doesnt end with', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = ['abc', 'C12'];

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail if the field ends with', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = ['123'];

    expect(directive.validate(control)).toEqual({doesntEndWith: true});
  });
});
