import { AbstractControl } from '@angular/forms';
import { NguardBooleanDirective } from './nguard-boolean.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardBooleanDirective', () => {
    let control: AbstractControl;
    let directive: NguardBooleanDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardBooleanDirective, '<div nguardBoolean></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate true', () => {
        control = createAbstractControlSpy(true);

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate the string "0"', () => {
        control = createAbstractControlSpy('0');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on a non boolean-like string', () => {
        control = createAbstractControlSpy('yes');

        expect(directive.validate(control)).toEqual({ boolean: true });
    });

    it('should fail on null', () => {
        control = createAbstractControlSpy(null);

        expect(directive.validate(control)).toEqual({ boolean: true });
    });
});
