import { AbstractControl } from '@angular/forms';
import { NguardLesserThanOrEqualDirective } from './nguard-lesser-than-or-equal.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardLesserThanOrEqualDirective', () => {
    let control: AbstractControl;
    let directive: NguardLesserThanOrEqualDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardLesserThanOrEqualDirective,
            '<div [nguardLesserThanOrEqual]="$any(value)"></div>',
            ''
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate two fields of the same type (strings)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'defghi');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail with the first value not lesser than or equal to the second', () => {
        control = createAbstractControlSpyWithSibling(10, 1);

        expect(directive.validate(control)).toEqual({ lesserThanOrEqual: true });
    });

    it('should fail with two fields of different types', () => {
        control = createAbstractControlSpyWithSibling('1', 10);

        expect(directive.validate(control)).toEqual({ lesserThanOrEqual: true });
    });
});
