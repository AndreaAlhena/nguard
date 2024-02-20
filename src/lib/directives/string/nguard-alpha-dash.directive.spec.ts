
import { AbstractControl } from '@angular/forms';
import { NguardAlphaDashDirective } from './nguard-alpha-dash.directive';
import { createAbstractControlSpy } from '../../utils/test.utils';

describe('NguardAlphaDashDirective', () => {
  let control: AbstractControl;
  let directive: NguardAlphaDashDirective;

  beforeEach(() => {
    directive = new NguardAlphaDashDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a properly formatted value (ASCII true)', () => {
    control = createAbstractControlSpy('abcABC_-123');
    directive.config = {hasAsciiOnly: true};

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a non properly formatted value (ASCII true)', () => {
    control = createAbstractControlSpy('a 2 c');
    directive.config = {hasAsciiOnly: true};

    expect(directive.validate(control)).toEqual({alphaDash: true});
  });

  it('should validate a properly formatted value (ASCII false)', () => {
    control = createAbstractControlSpy('abc字Б');

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a non properly formatted value (ASCII false)', () => {
    control = createAbstractControlSpy('a 2 c');

    expect(directive.validate(control)).toEqual({alphaDash: true});
  });
});
