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

describe('Number Validators - Integer', () => {
    it('Integer - Valid whole number', () => {
        control = createAbstractControlSpy(42);

        expect(NumberValidators.integer(control)).toBeNull();
    });

    it('Integer - Valid negative whole number', () => {
        control = createAbstractControlSpy(-10);

        expect(NumberValidators.integer(control)).toBeNull();
    });

    it('Integer - Valid zero', () => {
        control = createAbstractControlSpy(0);

        expect(NumberValidators.integer(control)).toBeNull();
    });

    it('Integer - Valid string number', () => {
        control = createAbstractControlSpy('42');

        expect(NumberValidators.integer(control)).toBeNull();
    });

    it('Integer - Invalid float', () => {
        control = createAbstractControlSpy(3.14);

        expect(NumberValidators.integer(control)).toEqual({ integer: true });
    });

    it('Integer - Invalid string float', () => {
        control = createAbstractControlSpy('3.14');

        expect(NumberValidators.integer(control)).toEqual({ integer: true });
    });

    it('Integer - Invalid null', () => {
        control = createAbstractControlSpy(null);

        expect(NumberValidators.integer(control)).toEqual({ integer: true });
    });

    it('Integer - Invalid empty string', () => {
        control = createAbstractControlSpy('');

        expect(NumberValidators.integer(control)).toEqual({ integer: true });
    });

    it('Integer - Invalid NaN', () => {
        control = createAbstractControlSpy(NaN);

        expect(NumberValidators.integer(control)).toEqual({ integer: true });
    });

    it('Integer - Invalid text', () => {
        control = createAbstractControlSpy('abc');

        expect(NumberValidators.integer(control)).toEqual({ integer: true });
    });
});

describe('Number Validators - Numeric', () => {
    it('Numeric - Valid integer', () => {
        control = createAbstractControlSpy(42);

        expect(NumberValidators.numeric(control)).toBeNull();
    });

    it('Numeric - Valid float', () => {
        control = createAbstractControlSpy(3.14);

        expect(NumberValidators.numeric(control)).toBeNull();
    });

    it('Numeric - Valid negative number', () => {
        control = createAbstractControlSpy(-100);

        expect(NumberValidators.numeric(control)).toBeNull();
    });

    it('Numeric - Valid string number', () => {
        control = createAbstractControlSpy('123.45');

        expect(NumberValidators.numeric(control)).toBeNull();
    });

    it('Numeric - Invalid null', () => {
        control = createAbstractControlSpy(null);

        expect(NumberValidators.numeric(control)).toEqual({ numeric: true });
    });

    it('Numeric - Invalid empty string', () => {
        control = createAbstractControlSpy('');

        expect(NumberValidators.numeric(control)).toEqual({ numeric: true });
    });

    it('Numeric - Invalid text', () => {
        control = createAbstractControlSpy('abc');

        expect(NumberValidators.numeric(control)).toEqual({ numeric: true });
    });

    it('Numeric - Invalid NaN', () => {
        control = createAbstractControlSpy(NaN);

        expect(NumberValidators.numeric(control)).toEqual({ numeric: true });
    });

    it('Numeric - Invalid Infinity', () => {
        control = createAbstractControlSpy(Infinity);

        expect(NumberValidators.numeric(control)).toEqual({ numeric: true });
    });
});

describe('Number Validators - Min', () => {
    it('Min - Valid above minimum', () => {
        control = createAbstractControlSpy(10);

        expect(NumberValidators.min(5)(control)).toBeNull();
    });

    it('Min - Valid at minimum', () => {
        control = createAbstractControlSpy(5);

        expect(NumberValidators.min(5)(control)).toBeNull();
    });

    it('Min - Invalid below minimum', () => {
        control = createAbstractControlSpy(3);

        expect(NumberValidators.min(5)(control)).toEqual({ min: true });
    });

    it('Min - Valid with negative minimum', () => {
        control = createAbstractControlSpy(-5);

        expect(NumberValidators.min(-10)(control)).toBeNull();
    });

    it('Min - Invalid with null', () => {
        control = createAbstractControlSpy(null);

        expect(NumberValidators.min(0)(control)).toEqual({ min: true });
    });

    it('Min - Invalid with NaN', () => {
        control = createAbstractControlSpy(NaN);

        expect(NumberValidators.min(0)(control)).toEqual({ min: true });
    });

    it('Min - Valid with string number', () => {
        control = createAbstractControlSpy('10');

        expect(NumberValidators.min(5)(control)).toBeNull();
    });
});

describe('Number Validators - Max', () => {
    it('Max - Valid below maximum', () => {
        control = createAbstractControlSpy(5);

        expect(NumberValidators.max(10)(control)).toBeNull();
    });

    it('Max - Valid at maximum', () => {
        control = createAbstractControlSpy(10);

        expect(NumberValidators.max(10)(control)).toBeNull();
    });

    it('Max - Invalid above maximum', () => {
        control = createAbstractControlSpy(15);

        expect(NumberValidators.max(10)(control)).toEqual({ max: true });
    });

    it('Max - Valid with negative maximum', () => {
        control = createAbstractControlSpy(-15);

        expect(NumberValidators.max(-10)(control)).toBeNull();
    });

    it('Max - Invalid with null', () => {
        control = createAbstractControlSpy(null);

        expect(NumberValidators.max(10)(control)).toEqual({ max: true });
    });

    it('Max - Invalid with NaN', () => {
        control = createAbstractControlSpy(NaN);

        expect(NumberValidators.max(10)(control)).toEqual({ max: true });
    });

    it('Max - Valid with string number', () => {
        control = createAbstractControlSpy('5');

        expect(NumberValidators.max(10)(control)).toBeNull();
    });
});

describe('Number Validators - Between', () => {
    it('Between - Valid in range', () => {
        control = createAbstractControlSpy(5);

        expect(NumberValidators.between(1, 10)(control)).toBeNull();
    });

    it('Between - Valid at minimum', () => {
        control = createAbstractControlSpy(1);

        expect(NumberValidators.between(1, 10)(control)).toBeNull();
    });

    it('Between - Valid at maximum', () => {
        control = createAbstractControlSpy(10);

        expect(NumberValidators.between(1, 10)(control)).toBeNull();
    });

    it('Between - Invalid below range', () => {
        control = createAbstractControlSpy(0);

        expect(NumberValidators.between(1, 10)(control)).toEqual({ between: true });
    });

    it('Between - Invalid above range', () => {
        control = createAbstractControlSpy(11);

        expect(NumberValidators.between(1, 10)(control)).toEqual({ between: true });
    });

    it('Between - Valid with negative range', () => {
        control = createAbstractControlSpy(-5);

        expect(NumberValidators.between(-10, -1)(control)).toBeNull();
    });

    it('Between - Throws error if min > max', () => {
        control = createAbstractControlSpy(5);

        expect(() => NumberValidators.between(10, 1)(control)).toThrowError(RangeValidatorErrors.MinGreaterThanMax);
    });

    it('Between - Invalid with null', () => {
        control = createAbstractControlSpy(null);

        expect(NumberValidators.between(1, 10)(control)).toEqual({ between: true });
    });

    it('Between - Invalid with NaN', () => {
        control = createAbstractControlSpy(NaN);

        expect(NumberValidators.between(1, 10)(control)).toEqual({ between: true });
    });
});

describe('Number Validators - Positive', () => {
    it('Positive - Valid positive number', () => {
        control = createAbstractControlSpy(5);

        expect(NumberValidators.positive(control)).toBeNull();
    });

    it('Positive - Invalid zero', () => {
        control = createAbstractControlSpy(0);

        expect(NumberValidators.positive(control)).toEqual({ positive: true });
    });

    it('Positive - Invalid negative number', () => {
        control = createAbstractControlSpy(-5);

        expect(NumberValidators.positive(control)).toEqual({ positive: true });
    });

    it('Positive - Valid with string positive number', () => {
        control = createAbstractControlSpy('5');

        expect(NumberValidators.positive(control)).toBeNull();
    });

    it('Positive - Invalid with null', () => {
        control = createAbstractControlSpy(null);

        expect(NumberValidators.positive(control)).toEqual({ positive: true });
    });

    it('Positive - Invalid with NaN', () => {
        control = createAbstractControlSpy(NaN);

        expect(NumberValidators.positive(control)).toEqual({ positive: true });
    });
});

describe('Number Validators - Negative', () => {
    it('Negative - Valid negative number', () => {
        control = createAbstractControlSpy(-5);

        expect(NumberValidators.negative(control)).toBeNull();
    });

    it('Negative - Invalid zero', () => {
        control = createAbstractControlSpy(0);

        expect(NumberValidators.negative(control)).toEqual({ negative: true });
    });

    it('Negative - Invalid positive number', () => {
        control = createAbstractControlSpy(5);

        expect(NumberValidators.negative(control)).toEqual({ negative: true });
    });

    it('Negative - Valid with string negative number', () => {
        control = createAbstractControlSpy('-5');

        expect(NumberValidators.negative(control)).toBeNull();
    });

    it('Negative - Invalid with null', () => {
        control = createAbstractControlSpy(null);

        expect(NumberValidators.negative(control)).toEqual({ negative: true });
    });

    it('Negative - Invalid with NaN', () => {
        control = createAbstractControlSpy(NaN);

        expect(NumberValidators.negative(control)).toEqual({ negative: true });
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
