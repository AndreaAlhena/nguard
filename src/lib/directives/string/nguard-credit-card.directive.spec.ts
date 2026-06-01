import { AbstractControl } from '@angular/forms';
import { NguardCreditCardDirective } from './nguard-credit-card.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardCreditCardDirective', () => {
    let control: AbstractControl;
    let directive: NguardCreditCardDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardCreditCardDirective, '<div nguardCreditCard></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a Luhn-valid card (spaces allowed)', () => {
        control = createAbstractControlSpy('4111 1111 1111 1111');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail a Luhn-invalid card', () => {
        control = createAbstractControlSpy('4111111111111112');

        expect(directive.validate(control)).toEqual({ creditCard: true });
    });
});
