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

    it('should validate when current is lesser than sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate when current is equal to sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 10);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when current is greater than sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 1);

        expect(directive.validate(control)).toEqual({ lesserThanOrEqual: true });
    });

    it('should fail when sibling is not numeric', () => {
        control = createAbstractControlSpyWithSibling(10, 'abc');

        expect(directive.validate(control)).toEqual({ lesserThanOrEqual: true });
    });
});
