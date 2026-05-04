import { AbstractControl } from '@angular/forms';
import { NguardGreaterThanDirective } from './nguard-greater-than.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardGreaterThanDirective', () => {
    let control: AbstractControl;
    let directive: NguardGreaterThanDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardGreaterThanDirective,
            '<div [nguardGreaterThan]="$any(value)"></div>',
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

    it('should fail when current is not greater than sibling', () => {
        control = createAbstractControlSpyWithSibling(1, 10);

        expect(directive.validate(control)).toEqual({ greaterThan: true });
    });

    it('should fail when sibling is not numeric', () => {
        control = createAbstractControlSpyWithSibling(10, 'abc');

        expect(directive.validate(control)).toEqual({ greaterThan: true });
    });
});
