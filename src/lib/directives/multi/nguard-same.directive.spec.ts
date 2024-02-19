import { AbstractControl } from '@angular/forms';
import { NguardSameDirective } from './nguard-same.directive';
import { createAbstractControlSpyWithSibling } from '../../utils/test.utils';

describe('NguardSameDirective', () => {
  let control: AbstractControl;
  let directive: NguardSameDirective;

  beforeEach(() => {
    directive = new NguardSameDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate two fields with the same value', () => {
    control = createAbstractControlSpyWithSibling('abc', 'abc');
    directive.controlKey = '';

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail if two fields have different values', () => {
    control = createAbstractControlSpyWithSibling('abc', 'def');
    directive.controlKey = '';

    expect(directive.validate(control)).toEqual({same: true});
  });
});
