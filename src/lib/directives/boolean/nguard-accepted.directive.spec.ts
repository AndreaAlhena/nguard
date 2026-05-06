import { AbstractControl } from '@angular/forms';
import { NguardAcceptedDirective } from './nguard-accepted.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardAcceptedDirective', () => {
    let control: AbstractControl;
    let directive: NguardAcceptedDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardAcceptedDirective, '<div nguardAccepted></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate true', () => {
        control = createAbstractControlSpy(true);

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate the string "yes"', () => {
        control = createAbstractControlSpy('yes');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate the string "on"', () => {
        control = createAbstractControlSpy('on');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on false', () => {
        control = createAbstractControlSpy(false);

        expect(directive.validate(control)).toEqual({ accepted: true });
    });

    it('should fail on the string "Yes" with different case', () => {
        control = createAbstractControlSpy('Yes');

        expect(directive.validate(control)).toEqual({ accepted: true });
    });
});
