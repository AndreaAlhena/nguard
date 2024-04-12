import { AbstractControl } from '@angular/forms';
import { NguardEndsWithDirective } from './nguard-ends-with.directive';
import { createAbstractControlSpy } from '../../utils/test.utils';

describe('NguardEndsWithDirective', () => {
  let control: AbstractControl;
  let directive: NguardEndsWithDirective;

  beforeEach(() => {
    directive = new NguardEndsWithDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a field that ends with (single value / no array)', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = '123';

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a field that ends with', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = ['123', '456'];

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail if the field doesnt ends with (single value / no array)', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = '12';

    expect(directive.validate(control)).toEqual({endsWith: true});
  });

  it('should fail if the field doesnt ends with', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = ['abc', '12'];

    expect(directive.validate(control)).toEqual({endsWith: true});
  });

  it('should validate a field that ends with (number)', () => {
    control = createAbstractControlSpy('abcABC123');
    directive.values = [123, '456'];

    expect(directive.validate(control)).toBeNull();
  });
});
