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

    it('should validate two fields of the same type (strings)', () => {
        control = createAbstractControlSpyWithSibling('defghi', 'abc');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail with the first value not greater than the second', () => {
        control = createAbstractControlSpyWithSibling(1, 10);

        expect(directive.validate(control)).toEqual({ greaterThan: true });
    });

    it('should fail with two fields of different types', () => {
        control = createAbstractControlSpyWithSibling('1', 10);

        expect(directive.validate(control)).toEqual({ greaterThan: true });
    });
});
