import { createAbstractControlSpyWithSibling } from '../../utils/test.utils';
import { NguardGreaterThanOrEqualDirective } from './nguard-greater-than-or-equal.directive';

describe('LesserThanDirective', () => {
  let control;
  let directive: NguardGreaterThanOrEqualDirective;

  beforeEach(() => {
    directive = new NguardGreaterThanOrEqualDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate two fields of the same type (strings)', () => {
    control = createAbstractControlSpyWithSibling('defghi', 'abc');
    directive.compareFieldKey = '';

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail with the first value not lesser than the second', () => {
    control = createAbstractControlSpyWithSibling(1, 10);
    directive.compareFieldKey = '';

    expect(directive.validate(control)).toEqual({greaterThanOrEqual: true});
  });

  it('should fail with two fields of different types', () => {
    control = createAbstractControlSpyWithSibling('1', 10);
    directive.compareFieldKey = '';

    expect(directive.validate(control)).toEqual({greaterThanOrEqual: true});
  });
});
