import { AbstractControl } from '@angular/forms';
import { NguardSsnDirective } from './nguard-ssn.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardSsnDirective', () => {
    let control: AbstractControl;
    let directive: NguardSsnDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardSsnDirective, '<div nguardSsn></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an SSN', () => {
        control = createAbstractControlSpy('123-45-6789');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail an invalid area number', () => {
        control = createAbstractControlSpy('000-45-6789');

        expect(directive.validate(control)).toEqual({ ssn: true });
    });
});
