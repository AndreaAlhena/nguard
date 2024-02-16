import { AbstractControl } from '@angular/forms';
import { NguardAsciiDirective } from './nguard-ascii.directive';
import { createAbstractControlSpy } from '../utils/test-utils';

describe('NguardAsciiDirective', () => {
  let control: AbstractControl;
  let directive: NguardAsciiDirective;

  beforeEach(() => {
    directive = new NguardAsciiDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a properly formatted value', () => {
    control = createAbstractControlSpy('abc ABC 123 #$%');
    expect(directive.validate(control)).toBeNull();
  });

  it('should validate an unproperly formatted value', () => {
    control = createAbstractControlSpy('abc 字Б 123');
    expect(directive.validate(control)).toEqual({ascii: true});
  });
});
