import { AbstractControl } from '@angular/forms';
import { NguardIpDirective } from './nguard-ip.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardIpDirective', () => {
    let control: AbstractControl;
    let directive: NguardIpDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardIpDirective, '<div nguardIp></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an IPv4 address', () => {
        control = createAbstractControlSpy('192.168.1.1');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate an IPv6 address', () => {
        control = createAbstractControlSpy('2001:0db8:85a3:0000:0000:8a2e:0370:7334');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on a malformed address', () => {
        control = createAbstractControlSpy('not-an-ip');

        expect(directive.validate(control)).toEqual({ ip: true });
    });
});
