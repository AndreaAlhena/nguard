import { AbstractControl } from '@angular/forms';
import { NguardIbanDirective } from './nguard-iban.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardIbanDirective', () => {
    let control: AbstractControl;
    let directive: NguardIbanDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardIbanDirective, '<div nguardIban></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an IBAN (spaces allowed)', () => {
        control = createAbstractControlSpy('GB82 WEST 1234 5698 7654 32');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail an IBAN with a bad checksum', () => {
        control = createAbstractControlSpy('GB82WEST12345698765431');

        expect(directive.validate(control)).toEqual({ iban: true });
    });
});
