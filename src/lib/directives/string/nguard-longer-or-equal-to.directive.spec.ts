import { AbstractControl } from '@angular/forms';
import { NguardLongerOrEqualToDirective } from './nguard-longer-or-equal-to.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardLongerOrEqualToDirective', () => {
    let control: AbstractControl;
    let directive: NguardLongerOrEqualToDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardLongerOrEqualToDirective,
            '<div [nguardLongerOrEqualTo]="$any(value)"></div>',
            ''
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when current is longer than sibling', () => {
        control = createAbstractControlSpyWithSibling('long string', 'short');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate when current has the same length as sibling', () => {
        control = createAbstractControlSpyWithSibling('abc', 'xyz');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when current is shorter than sibling', () => {
        control = createAbstractControlSpyWithSibling('a', 'longer');

        expect(directive.validate(control)).toEqual({ longerOrEqualTo: true });
    });

    it('should fail when sibling is not a string', () => {
        control = createAbstractControlSpyWithSibling('abc', 5);

        expect(directive.validate(control)).toEqual({ longerOrEqualTo: true });
    });
});
