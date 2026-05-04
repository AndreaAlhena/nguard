import { AbstractControl } from '@angular/forms';
import { NguardDigitsBetweenDirective } from './nguard-digits-between.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardDigitsBetweenDirective', () => {
    let control: AbstractControl;
    let directive: NguardDigitsBetweenDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardDigitsBetweenDirective,
            '<div [nguardDigitsBetween]="$any(value)"></div>',
            [3, 5]
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate at the lower bound', () => {
        control = createAbstractControlSpy(123);

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate at the upper bound', () => {
        control = createAbstractControlSpy(12345);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail below the lower bound', () => {
        control = createAbstractControlSpy(12);

        expect(directive.validate(control)).toEqual({ digitsBetween: true });
    });

    it('should fail above the upper bound', () => {
        control = createAbstractControlSpy(123456);

        expect(directive.validate(control)).toEqual({ digitsBetween: true });
    });
});
