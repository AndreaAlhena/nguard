import { AbstractControl } from '@angular/forms';
import { NguardIpv4Directive } from './nguard-ipv4.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardIpv4Directive', () => {
    let control: AbstractControl;
    let directive: NguardIpv4Directive;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardIpv4Directive, '<div nguardIpv4></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a standard IPv4 address', () => {
        control = createAbstractControlSpy('192.168.1.1');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on an out-of-range octet', () => {
        control = createAbstractControlSpy('999.0.0.1');

        expect(directive.validate(control)).toEqual({ ipv4: true });
    });

    it('should fail on an IPv6 address', () => {
        control = createAbstractControlSpy('2001:db8::1');

        expect(directive.validate(control)).toEqual({ ipv4: true });
    });
});
