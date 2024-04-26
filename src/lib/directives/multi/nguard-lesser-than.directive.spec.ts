import { createAbstractControlSpyWithSibling } from '../../utils/test.utils';
import { NguardLesserThanDirective } from './nguard-lesser-than.directive';

describe('LesserThanDirective', () => {
  let control;
  let directive: NguardLesserThanDirective;

  beforeEach(() => {
    directive = new NguardLesserThanDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate two fields of the same type (strings)', () => {
    control = createAbstractControlSpyWithSibling('abc', 'defghi');
    directive.compareFieldKey = '';

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail with the first value not lesser than the second', () => {
    control = createAbstractControlSpyWithSibling(10, 1);
    directive.compareFieldKey = '';

    expect(directive.validate(control)).toEqual({lesserThan: true});
  });

  it('should fail with two fields of different types', () => {
    control = createAbstractControlSpyWithSibling('1', 10);
    directive.compareFieldKey = '';

    expect(directive.validate(control)).toEqual({lesserThan: true});
  });
});