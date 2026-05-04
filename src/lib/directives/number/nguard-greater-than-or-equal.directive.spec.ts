import { AbstractControl } from '@angular/forms';
import { NguardGreaterThanOrEqualDirective } from './nguard-greater-than-or-equal.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardGreaterThanOrEqualDirective', () => {
    let control: AbstractControl;
    let directive: NguardGreaterThanOrEqualDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardGreaterThanOrEqualDirective,
            '<div [nguardGreaterThanOrEqual]="$any(value)"></div>',
            ''
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when current is greater than sibling', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate when current is equal to sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 10);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when current is lesser than sibling', () => {
        control = createAbstractControlSpyWithSibling(1, 10);

        expect(directive.validate(control)).toEqual({ greaterThanOrEqual: true });
    });

    it('should fail when sibling is not numeric', () => {
        control = createAbstractControlSpyWithSibling(10, 'abc');

        expect(directive.validate(control)).toEqual({ greaterThanOrEqual: true });
    });
});
