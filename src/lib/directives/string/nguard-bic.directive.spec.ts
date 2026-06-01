import { AbstractControl } from '@angular/forms';
import { NguardBicDirective } from './nguard-bic.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardBicDirective', () => {
    let control: AbstractControl;
    let directive: NguardBicDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardBicDirective, '<div nguardBic></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a BIC', () => {
        control = createAbstractControlSpy('DEUTDEFF');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on an invalid BIC', () => {
        control = createAbstractControlSpy('XX');

        expect(directive.validate(control)).toEqual({ bic: true });
    });
});
