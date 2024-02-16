
import { AbstractControl } from '@angular/forms';
import { NguardAlphaNumDirective } from './nguard-alpha-num.directive';
import { createAbstractControlSpy } from '../utils/test-utils';

describe('NguardAlphaNumDirective', () => {
  let control: AbstractControl;
  let directive: NguardAlphaNumDirective;

  beforeEach(() => {
    directive = new NguardAlphaNumDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a properly formatted value (ASCII true)', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.config = {hasAsciiOnly: true};

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a non properly formatted value (ASCII true)', () => {
    control = createAbstractControlSpy('a 2-c');
    directive.config = {hasAsciiOnly: true};

    expect(directive.validate(control)).toEqual({alphaNum: true});
  });

  it('should validate a properly formatted value (ASCII false)', () => {
    control = createAbstractControlSpy('abc字Б123');

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a non properly formatted value (ASCII false)', () => {
    control = createAbstractControlSpy('abc字Б 123 -');

    expect(directive.validate(control)).toEqual({alphaNum: true});
  });
});
