import { AbstractControl } from '@angular/forms';
import { NguardIpv6Directive } from './nguard-ipv6.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardIpv6Directive', () => {
    let control: AbstractControl;
    let directive: NguardIpv6Directive;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardIpv6Directive, '<div nguardIpv6></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a full IPv6 address', () => {
        control = createAbstractControlSpy('2001:0db8:85a3:0000:0000:8a2e:0370:7334');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate a compressed IPv6 address', () => {
        control = createAbstractControlSpy('2001:db8::1');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on an IPv4 address', () => {
        control = createAbstractControlSpy('192.168.1.1');

        expect(directive.validate(control)).toEqual({ ipv6: true });
    });
});
