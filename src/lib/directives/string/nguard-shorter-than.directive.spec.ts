import { AbstractControl } from '@angular/forms';
import { NguardShorterThanDirective } from './nguard-shorter-than.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardShorterThanDirective', () => {
    let control: AbstractControl;
    let directive: NguardShorterThanDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardShorterThanDirective,
            '<div [nguardShorterThan]="$any(value)"></div>',
            ''
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when current is shorter than sibling', () => {
        control = createAbstractControlSpyWithSibling('a', 'longer');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when current has the same length as sibling', () => {
        control = createAbstractControlSpyWithSibling('abc', 'xyz');

        expect(directive.validate(control)).toEqual({ shorterThan: true });
    });

    it('should fail when sibling is not a string', () => {
        control = createAbstractControlSpyWithSibling('abc', 5);

        expect(directive.validate(control)).toEqual({ shorterThan: true });
    });
});
