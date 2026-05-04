import { AbstractControl } from '@angular/forms';
import { NguardDigitsDirective } from './nguard-digits.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardDigitsDirective', () => {
    let control: AbstractControl;
    let directive: NguardDigitsDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardDigitsDirective, '<div [nguardDigits]="$any(value)"></div>', 4));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a 4-digit number', () => {
        control = createAbstractControlSpy(1234);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on a 3-digit number', () => {
        control = createAbstractControlSpy(123);

        expect(directive.validate(control)).toEqual({ digits: true });
    });

    it('should fail on a non-integer value', () => {
        control = createAbstractControlSpy(12.34);

        expect(directive.validate(control)).toEqual({ digits: true });
    });
});
