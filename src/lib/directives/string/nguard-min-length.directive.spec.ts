import { AbstractControl } from '@angular/forms';
import { NguardMinLengthDirective } from './nguard-min-length.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardMinLengthDirective', () => {
    let control: AbstractControl;
    let directive: NguardMinLengthDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardMinLengthDirective,
            '<div [nguardMinLength]="$any(value)"></div>',
            5
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when length meets minimum', () => {
        control = createAbstractControlSpy('hello');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate when length exceeds minimum', () => {
        control = createAbstractControlSpy('hello world');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when length is below minimum', () => {
        control = createAbstractControlSpy('hi');

        expect(directive.validate(control)).toEqual({ minLength: true });
    });

    it('should fail on non-string input', () => {
        control = createAbstractControlSpy(12345);

        expect(directive.validate(control)).toEqual({ minLength: true });
    });
});
