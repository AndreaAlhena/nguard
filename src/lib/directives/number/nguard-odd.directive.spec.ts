import { AbstractControl } from '@angular/forms';
import { NguardOddDirective } from './nguard-odd.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardOddDirective', () => {
    let control: AbstractControl;
    let directive: NguardOddDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardOddDirective, '<div nguardOdd></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an odd integer', () => {
        control = createAbstractControlSpy(3);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on an even integer', () => {
        control = createAbstractControlSpy(4);

        expect(directive.validate(control)).toEqual({ odd: true });
    });

    it('should fail on a non-integer', () => {
        control = createAbstractControlSpy(3.5);

        expect(directive.validate(control)).toEqual({ odd: true });
    });
});
