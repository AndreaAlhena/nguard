import { AbstractControl } from '@angular/forms';
import { NguardMaxLengthDirective } from './nguard-max-length.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardMaxLengthDirective', () => {
    let control: AbstractControl;
    let directive: NguardMaxLengthDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardMaxLengthDirective,
            '<div [nguardMaxLength]="$any(value)"></div>',
            5
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when length is at the maximum', () => {
        control = createAbstractControlSpy('hello');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate when length is below maximum', () => {
        control = createAbstractControlSpy('hi');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when length exceeds maximum', () => {
        control = createAbstractControlSpy('hello world');

        expect(directive.validate(control)).toEqual({ maxLength: true });
    });

    it('should fail on non-string input', () => {
        control = createAbstractControlSpy(12345);

        expect(directive.validate(control)).toEqual({ maxLength: true });
    });
});
