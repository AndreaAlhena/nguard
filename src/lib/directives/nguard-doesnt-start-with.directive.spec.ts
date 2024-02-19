import { AbstractControl } from '@angular/forms';
import { NguardDoesntStartWithDirective } from './nguard-doesnt-start-with.directive';
import { createAbstractControlSpy } from '../utils/test.utils';

describe('NguardDoesntStartWithDirective', () => {
  let control: AbstractControl;
  let directive: NguardDoesntStartWithDirective;

  beforeEach(() => {
    directive = new NguardDoesntStartWithDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a field that doesnt start with', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = ['123', 'def'];

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail if the field starts with', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = ['abc'];

    expect(directive.validate(control)).toEqual({doesntStartWith: true});
  });
});
