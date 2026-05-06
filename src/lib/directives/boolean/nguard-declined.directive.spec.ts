import { AbstractControl } from '@angular/forms';
import { NguardDeclinedDirective } from './nguard-declined.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardDeclinedDirective', () => {
    let control: AbstractControl;
    let directive: NguardDeclinedDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardDeclinedDirective, '<div nguardDeclined></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate false', () => {
        control = createAbstractControlSpy(false);

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate the string "no"', () => {
        control = createAbstractControlSpy('no');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate the string "off"', () => {
        control = createAbstractControlSpy('off');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on true', () => {
        control = createAbstractControlSpy(true);

        expect(directive.validate(control)).toEqual({ declined: true });
    });

    it('should fail on the string "No" with different case', () => {
        control = createAbstractControlSpy('No');

        expect(directive.validate(control)).toEqual({ declined: true });
    });
});
