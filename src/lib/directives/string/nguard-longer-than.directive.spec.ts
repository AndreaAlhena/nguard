import { AbstractControl } from '@angular/forms';
import { NguardLongerThanDirective } from './nguard-longer-than.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardLongerThanDirective', () => {
    let control: AbstractControl;
    let directive: NguardLongerThanDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardLongerThanDirective,
            '<div [nguardLongerThan]="$any(value)"></div>',
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

    it('should fail when current has the same length as sibling', () => {
        control = createAbstractControlSpyWithSibling('abc', 'xyz');

        expect(directive.validate(control)).toEqual({ longerThan: true });
    });

    it('should fail when sibling is not a string', () => {
        control = createAbstractControlSpyWithSibling('abc', 5);

        expect(directive.validate(control)).toEqual({ longerThan: true });
    });
});
