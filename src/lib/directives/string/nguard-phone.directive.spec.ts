import { AbstractControl } from '@angular/forms';
import { NguardPhoneDirective } from './nguard-phone.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardPhoneDirective', () => {
    let control: AbstractControl;
    let directive: NguardPhoneDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardPhoneDirective, '<div [nguardPhone]="$any(value)"></div>', 'US'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a US national number', () => {
        control = createAbstractControlSpy('(415) 555-2671');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate an E.164 number', () => {
        control = createAbstractControlSpy('+14155552671');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail an invalid number', () => {
        control = createAbstractControlSpy('123');

        expect(directive.validate(control)).toEqual({ phone: true });
    });
});
