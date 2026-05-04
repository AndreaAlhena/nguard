import { AbstractControl } from '@angular/forms';
import { NguardMacAddressDirective } from './nguard-mac-address.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardMacAddressDirective', () => {
    let control: AbstractControl;
    let directive: NguardMacAddressDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardMacAddressDirective, '<div nguardMacAddress></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a colon-separated MAC', () => {
        control = createAbstractControlSpy('00:1B:44:11:3A:B7');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate a Cisco dot-separated MAC', () => {
        control = createAbstractControlSpy('001B.4411.3AB7');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on a malformed MAC', () => {
        control = createAbstractControlSpy('not-a-mac');

        expect(directive.validate(control)).toEqual({ macAddress: true });
    });
});
