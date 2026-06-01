import { AbstractControl } from '@angular/forms';
import { NguardPostalCodeDirective } from './nguard-postal-code.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardPostalCodeDirective', () => {
    let control: AbstractControl;
    let directive: NguardPostalCodeDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardPostalCodeDirective,
            '<div [nguardPostalCode]="$any(value)"></div>',
            'US'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a US ZIP', () => {
        control = createAbstractControlSpy('12345-6789');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail a non-US-format value', () => {
        control = createAbstractControlSpy('ABCDE');

        expect(directive.validate(control)).toEqual({ postalCode: true });
    });
});
