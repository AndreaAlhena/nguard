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

    it('should validate two fields of the same type (strings)', () => {
        control = createAbstractControlSpyWithSibling('defghi', 'abc');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail with the first value not greater than or equal to the second', () => {
        control = createAbstractControlSpyWithSibling(1, 10);

        expect(directive.validate(control)).toEqual({ greaterThanOrEqual: true });
    });

    it('should fail with two fields of different types', () => {
        control = createAbstractControlSpyWithSibling('1', 10);

        expect(directive.validate(control)).toEqual({ greaterThanOrEqual: true });
    });
});
