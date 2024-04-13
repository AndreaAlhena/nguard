import { createAbstractControlSpyWithSibling } from '../../utils/test.utils';
import { NguardGreaterThanDirective } from './nguard-greater-than.directive';

describe('LesserThanDirective', () => {
  let control;
  let directive: NguardGreaterThanDirective;

  beforeEach(() => {
    directive = new NguardGreaterThanDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate two fields of the same type (strings)', () => {
    control = createAbstractControlSpyWithSibling('defghi', 'abc');
    directive.compareFieldKey = '';

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail with the first value not greater than the second', () => {
    control = createAbstractControlSpyWithSibling(1, 10);
    directive.compareFieldKey = '';

    expect(directive.validate(control)).toEqual({greaterThan: true});
  });

  it('should fail with two fields of different types', () => {
    control = createAbstractControlSpyWithSibling('1', 10);
    directive.compareFieldKey = '';

    expect(directive.validate(control)).toEqual({greaterThan: true});
  });
});
