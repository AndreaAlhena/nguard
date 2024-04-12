import { AbstractControl } from '@angular/forms';
import { NguardStartsWithDirective } from './nguard-starts-with.directive';
import { createAbstractControlSpy } from '../../utils/test.utils';

describe('NguardStartsWithDirective', () => {
  let control: AbstractControl;
  let directive: NguardStartsWithDirective;

  beforeEach(() => {
    directive = new NguardStartsWithDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a field that starts with (single value / no array)', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = 'abc';

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a field that starts with', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = ['123', 'abc'];

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail if the field doesnt start with (single value / no array)', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = '123';

    expect(directive.validate(control)).toEqual({startsWith: true});
  });

  it('should fail if the field doesnt start with', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = ['123', '456'];

    expect(directive.validate(control)).toEqual({startsWith: true});
  });
});
