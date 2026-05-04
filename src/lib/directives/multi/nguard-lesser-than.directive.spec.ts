import { AbstractControl } from '@angular/forms';
import { NguardLesserThanDirective } from './nguard-lesser-than.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardLesserThanDirective', () => {
    let control: AbstractControl;
    let directive: NguardLesserThanDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardLesserThanDirective,
            '<div [nguardLesserThan]="$any(value)"></div>',
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

    it('should fail with the first value not lesser than the second', () => {
        control = createAbstractControlSpyWithSibling(10, 1);

        expect(directive.validate(control)).toEqual({ lesserThan: true });
    });

    it('should fail with two fields of different types', () => {
        control = createAbstractControlSpyWithSibling('1', 10);

        expect(directive.validate(control)).toEqual({ lesserThan: true });
    });
});
