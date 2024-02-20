import { AbstractControl } from '@angular/forms';
import { NguardAlphaDirective } from './nguard-alpha.directive';
import { createAbstractControlSpy } from '../../utils/test.utils';

describe('NguardAlphaDirective', () => {
  let control: AbstractControl;
  let directive: NguardAlphaDirective;

  beforeEach(() => {
    directive = new NguardAlphaDirective()
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a properly formatted value (ASCII true)', () => {
    control = createAbstractControlSpy('abc');
    directive.config = {hasAsciiOnly: true};

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a non properly formatted value (ASCII true)', () => {
    control = createAbstractControlSpy('a2c');
    directive.config = {hasAsciiOnly: true};

    expect(directive.validate(control)).toEqual({alpha: true});
  });

  it('should validate a properly formatted value (ASCII false)', () => {
    control = createAbstractControlSpy('abc字Б');

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a non properly formatted value (ASCII false)', () => {
    control = createAbstractControlSpy('a 2 c');

    expect(directive.validate(control)).toEqual({alpha: true});
  });
});
