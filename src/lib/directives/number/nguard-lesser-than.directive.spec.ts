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

    it('should validate when current is lesser than sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when current is not lesser than sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 1);

        expect(directive.validate(control)).toEqual({ lesserThan: true });
    });

    it('should fail when sibling is not numeric', () => {
        control = createAbstractControlSpyWithSibling(10, 'abc');

        expect(directive.validate(control)).toEqual({ lesserThan: true });
    });
});
