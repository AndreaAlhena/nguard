import { AbstractControl } from '@angular/forms';
import { NguardEvenDirective } from './nguard-even.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardEvenDirective', () => {
    let control: AbstractControl;
    let directive: NguardEvenDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardEvenDirective, '<div nguardEven></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an even integer', () => {
        control = createAbstractControlSpy(4);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on an odd integer', () => {
        control = createAbstractControlSpy(3);

        expect(directive.validate(control)).toEqual({ even: true });
    });

    it('should fail on a non-integer', () => {
        control = createAbstractControlSpy(2.5);

        expect(directive.validate(control)).toEqual({ even: true });
    });
});
