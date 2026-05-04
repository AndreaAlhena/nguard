import { AbstractControl } from '@angular/forms';
import { NguardLengthDirective } from './nguard-length.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardLengthDirective', () => {
    let control: AbstractControl;
    let directive: NguardLengthDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardLengthDirective, '<div [nguardLength]="$any(value)"></div>', 5));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when length matches', () => {
        control = createAbstractControlSpy('hello');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when length is shorter', () => {
        control = createAbstractControlSpy('hi');

        expect(directive.validate(control)).toEqual({ length: true });
    });

    it('should fail when length is longer', () => {
        control = createAbstractControlSpy('hellos');

        expect(directive.validate(control)).toEqual({ length: true });
    });

    it('should fail on non-string input', () => {
        control = createAbstractControlSpy(12345);

        expect(directive.validate(control)).toEqual({ length: true });
    });
});
