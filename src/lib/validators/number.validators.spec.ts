import { AbstractControl } from '@angular/forms';
import { createAbstractControlSpy } from '../utils/test.utils';
import { NumberValidators } from './number.validators';
import { RangeValidatorErrors } from '../errors/range-validator.errors';

let control: jasmine.SpyObj<AbstractControl>;

describe('Number Validators - Range', () => {
    it('Valid if value is in range', () => {
        control = createAbstractControlSpy(1);

        expect(NumberValidators.range(0, 5)(control)).toBeNull();
    });

    it('Invalid if value is not in range', () => {
        control = createAbstractControlSpy(6);

        expect(NumberValidators.range(0, 5)(control)).toEqual({ range: true });
    });

    it('Invalid if value is below range', () => {
        control = createAbstractControlSpy(-3);

        expect(NumberValidators.range(0, 5)(control)).toEqual({ range: true });
    });

    it('Throws error if min is greater than max', () => {
        control = createAbstractControlSpy(3);

        expect(() => NumberValidators.range(5, 0)(control)).toThrowError(RangeValidatorErrors.MinGreaterThanMax);
    });

    it('Valid if value is a string castable to number', () => {
        control = createAbstractControlSpy('0');

        expect(NumberValidators.range(0, 5)(control)).toBeNull();
    });

    it('Invalid if value is a string not castable to number (alpha only)', () => {
        control = createAbstractControlSpy('abc');

        expect(NumberValidators.range(0, 5)(control)).toEqual({ range: true });
    });

    it('Invalid if value is a string not castable to number (mix number & alpha)', () => {
        control = createAbstractControlSpy('0a');

        expect(NumberValidators.range(0, 5)(control)).toEqual({ range: true });
    });
});

describe('Number Validators - Edge Cases', () => {
    describe('Null/Undefined handling', () => {
        it('Range - Should reject null input', () => {
            control = createAbstractControlSpy(null);

            expect(NumberValidators.range(0, 10)(control)).toEqual({ range: true });
        });

        it('Range - Should reject undefined input', () => {
            control = createAbstractControlSpy(undefined);

            expect(NumberValidators.range(0, 10)(control)).toEqual({ range: true });
        });
    });

    describe('Empty string handling', () => {
        it('Range - Should reject empty string', () => {
            control = createAbstractControlSpy('');

            expect(NumberValidators.range(0, 10)(control)).toEqual({ range: true });
        });
    });

    describe('Boundary conditions', () => {
        it('Range - Valid when value equals min', () => {
            control = createAbstractControlSpy(0);

            expect(NumberValidators.range(0, 10)(control)).toBeNull();
        });

        it('Range - Valid when value equals max', () => {
            control = createAbstractControlSpy(10);

            expect(NumberValidators.range(0, 10)(control)).toBeNull();
        });

        it('Range - Valid when min equals max and value equals both', () => {
            control = createAbstractControlSpy(5);

            expect(NumberValidators.range(5, 5)(control)).toBeNull();
        });

        it('Range - Invalid when value is one below min', () => {
            control = createAbstractControlSpy(-1);

            expect(NumberValidators.range(0, 10)(control)).toEqual({ range: true });
        });

        it('Range - Invalid when value is one above max', () => {
            control = createAbstractControlSpy(11);

            expect(NumberValidators.range(0, 10)(control)).toEqual({ range: true });
        });
    });

    describe('Floating point handling', () => {
        it('Range - Valid with float in range', () => {
            control = createAbstractControlSpy(5.5);

            expect(NumberValidators.range(0, 10)(control)).toBeNull();
        });

        it('Range - Valid with float at boundary', () => {
            control = createAbstractControlSpy(0.0);

            expect(NumberValidators.range(0, 10)(control)).toBeNull();
        });

        it('Range - Invalid with float below range', () => {
            control = createAbstractControlSpy(-0.1);

            expect(NumberValidators.range(0, 10)(control)).toEqual({ range: true });
        });

        it('Range - Invalid with float above range', () => {
            control = createAbstractControlSpy(10.1);

            expect(NumberValidators.range(0, 10)(control)).toEqual({ range: true });
        });

        it('Range - Valid with float string in range', () => {
            control = createAbstractControlSpy('5.5');

            expect(NumberValidators.range(0, 10)(control)).toBeNull();
        });
    });

    describe('Negative range handling', () => {
        it('Range - Valid with negative range', () => {
            control = createAbstractControlSpy(-5);

            expect(NumberValidators.range(-10, -1)(control)).toBeNull();
        });

        it('Range - Valid crossing zero', () => {
            control = createAbstractControlSpy(0);

            expect(NumberValidators.range(-5, 5)(control)).toBeNull();
        });

        it('Range - Invalid below negative range', () => {
            control = createAbstractControlSpy(-15);

            expect(NumberValidators.range(-10, -1)(control)).toEqual({ range: true });
        });
    });

    describe('Special number values', () => {
        it('Range - Should reject NaN', () => {
            control = createAbstractControlSpy(NaN);

            expect(NumberValidators.range(0, 10)(control)).toEqual({ range: true });
        });

        it('Range - Should reject Infinity', () => {
            control = createAbstractControlSpy(Infinity);

            expect(NumberValidators.range(0, 10)(control)).toEqual({ range: true });
        });

        it('Range - Should reject negative Infinity', () => {
            control = createAbstractControlSpy(-Infinity);

            expect(NumberValidators.range(0, 10)(control)).toEqual({ range: true });
        });
    });

    describe('Boolean handling', () => {
        it('Range - Should handle boolean true (coerced to 1)', () => {
            control = createAbstractControlSpy(true);

            expect(NumberValidators.range(0, 10)(control)).toBeNull();
        });

        it('Range - Should handle boolean false (coerced to 0)', () => {
            control = createAbstractControlSpy(false);

            expect(NumberValidators.range(0, 10)(control)).toBeNull();
        });
    });
});
