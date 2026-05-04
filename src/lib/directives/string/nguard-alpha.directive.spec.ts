import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardAlphaDirective } from './nguard-alpha.directive';
import { createAbstractControlSpy, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardAlphaDirective', () => {
    let control: AbstractControl;
    let directive: NguardAlphaDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardAlphaDirective,
            '<div [nguardAlpha]="$any(value)"></div>'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a properly formatted value (ASCII true)', () => {
        control = createAbstractControlSpy('abc');
        host.value = { hasAsciiOnly: true };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate a non properly formatted value (ASCII true)', () => {
        control = createAbstractControlSpy('a2c');
        host.value = { hasAsciiOnly: true };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ alpha: true });
    });

    it('should validate a properly formatted value (ASCII false)', () => {
        control = createAbstractControlSpy('abc字Б');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate a non properly formatted value (ASCII false)', () => {
        control = createAbstractControlSpy('a 2 c');

        expect(directive.validate(control)).toEqual({ alpha: true });
    });

    describe('Validator Interface', () => {
        it('should implement Validator interface', () => {
            expect(directive.validate).toBeDefined();
            expect(typeof directive.validate).toBe('function');
        });

        it('should return ValidationErrors or null', () => {
            control = createAbstractControlSpy('abc');
            const result = directive.validate(control);

            expect(result === null || typeof result === 'object').toBeTrue();
        });
    });

    describe('Edge Cases', () => {
        it('should handle undefined config', () => {
            control = createAbstractControlSpy('abc');

            expect(directive.validate(control)).toBeNull();
        });

        it('should handle null config', () => {
            control = createAbstractControlSpy('abc');
            host.value = null;
            fixture.detectChanges();

            expect(directive.validate(control)).toBeNull();
        });

        it('should handle empty config object', () => {
            control = createAbstractControlSpy('abc');
            host.value = {};
            fixture.detectChanges();

            expect(directive.validate(control)).toBeNull();
        });

        it('should handle null input value', () => {
            control = createAbstractControlSpy(null);
            host.value = { hasAsciiOnly: true };
            fixture.detectChanges();

            expect(directive.validate(control)).toEqual({ alpha: true });
        });

        it('should handle undefined input value', () => {
            control = createAbstractControlSpy(undefined);
            host.value = { hasAsciiOnly: true };
            fixture.detectChanges();

            expect(directive.validate(control)).toEqual({ alpha: true });
        });

        it('should handle empty string input value', () => {
            control = createAbstractControlSpy('');
            host.value = { hasAsciiOnly: true };
            fixture.detectChanges();

            expect(directive.validate(control)).toEqual({ alpha: true });
        });
    });
});
