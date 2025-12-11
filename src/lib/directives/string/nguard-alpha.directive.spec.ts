import { AbstractControl } from '@angular/forms';
import { NguardAlphaDirective } from './nguard-alpha.directive';
import { createAbstractControlSpy } from '../../utils/test.utils';

describe('NguardAlphaDirective', () => {
    let control: AbstractControl;
    let directive: NguardAlphaDirective;

    beforeEach(() => {
        directive = new NguardAlphaDirective();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a properly formatted value (ASCII true)', () => {
        control = createAbstractControlSpy('abc');
        directive.config = { hasAsciiOnly: true };

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate a non properly formatted value (ASCII true)', () => {
        control = createAbstractControlSpy('a2c');
        directive.config = { hasAsciiOnly: true };

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
            directive.config = undefined as any;

            expect(directive.validate(control)).toBeNull();
        });

        it('should handle null config', () => {
            control = createAbstractControlSpy('abc');
            directive.config = null as any;

            expect(directive.validate(control)).toBeNull();
        });

        it('should handle empty config object', () => {
            control = createAbstractControlSpy('abc');
            directive.config = {} as any;

            expect(directive.validate(control)).toBeNull();
        });

        it('should handle null input value', () => {
            control = createAbstractControlSpy(null);
            directive.config = { hasAsciiOnly: true };

            expect(directive.validate(control)).toEqual({ alpha: true });
        });

        it('should handle undefined input value', () => {
            control = createAbstractControlSpy(undefined);
            directive.config = { hasAsciiOnly: true };

            expect(directive.validate(control)).toEqual({ alpha: true });
        });

        it('should handle empty string input value', () => {
            control = createAbstractControlSpy('');
            directive.config = { hasAsciiOnly: true };

            expect(directive.validate(control)).toEqual({ alpha: true });
        });
    });
});
