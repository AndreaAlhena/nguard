import { AbstractControl } from '@angular/forms';
import {
    createAbstractControlSpy,
    createAbstractControlSpyWithSibling,
    createControlSpyWithNullSibling,
    createOrphanControlSpy,
} from '../utils/test.utils';
import { NumberValidators } from './number.validators';
import { RangeValidatorErrors } from '../errors/range-validator.errors';

let control: jasmine.SpyObj<AbstractControl>;

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

describe('Number Validators - Greater Than', () => {
    it('Valid when current is greater than sibling', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(NumberValidators.greaterThan('')(control)).toBeNull();
    });

    it('Invalid when current is equal to sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 10);

        expect(NumberValidators.greaterThan('')(control)).toEqual({ greaterThan: true });
    });

    it('Invalid when current is lesser than sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(NumberValidators.greaterThan('')(control)).toEqual({ greaterThan: true });
    });

    it('Invalid when current is not numeric', () => {
        control = createAbstractControlSpyWithSibling('abc', 10);

        expect(NumberValidators.greaterThan('')(control)).toEqual({ greaterThan: true });
    });

    it('Invalid when sibling is not numeric', () => {
        control = createAbstractControlSpyWithSibling(10, 'abc');

        expect(NumberValidators.greaterThan('')(control)).toEqual({ greaterThan: true });
    });

    it('Invalid when sibling is null', () => {
        control = createControlSpyWithNullSibling(10);

        expect(NumberValidators.greaterThan('')(control)).toEqual({ greaterThan: true });
    });

    it('Invalid when control has no parent', () => {
        control = createOrphanControlSpy(10);

        expect(NumberValidators.greaterThan('')(control)).toEqual({ greaterThan: true });
    });
});

describe('Number Validators - Greater Than or Equal', () => {
    it('Valid when current is greater than sibling', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(NumberValidators.greaterThanOrEqual('')(control)).toBeNull();
    });

    it('Valid when current is equal to sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 10);

        expect(NumberValidators.greaterThanOrEqual('')(control)).toBeNull();
    });

    it('Invalid when current is lesser than sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(NumberValidators.greaterThanOrEqual('')(control)).toEqual({ greaterThanOrEqual: true });
    });

    it('Invalid when sibling is not numeric', () => {
        control = createAbstractControlSpyWithSibling(10, 'abc');

        expect(NumberValidators.greaterThanOrEqual('')(control)).toEqual({ greaterThanOrEqual: true });
    });
});

describe('Number Validators - Lesser Than', () => {
    it('Valid when current is lesser than sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(NumberValidators.lesserThan('')(control)).toBeNull();
    });

    it('Invalid when current is equal to sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 10);

        expect(NumberValidators.lesserThan('')(control)).toEqual({ lesserThan: true });
    });

    it('Invalid when current is greater than sibling', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(NumberValidators.lesserThan('')(control)).toEqual({ lesserThan: true });
    });

    it('Invalid when current is not numeric', () => {
        control = createAbstractControlSpyWithSibling('abc', 10);

        expect(NumberValidators.lesserThan('')(control)).toEqual({ lesserThan: true });
    });

    it('Invalid when control has no parent', () => {
        control = createOrphanControlSpy(10);

        expect(NumberValidators.lesserThan('')(control)).toEqual({ lesserThan: true });
    });
});

describe('Number Validators - Lesser Than or Equal', () => {
    it('Valid when current is lesser than sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(NumberValidators.lesserThanOrEqual('')(control)).toBeNull();
    });

    it('Valid when current is equal to sibling', () => {
        control = createAbstractControlSpyWithSibling(10, 10);

        expect(NumberValidators.lesserThanOrEqual('')(control)).toBeNull();
    });

    it('Invalid when current is greater than sibling', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(NumberValidators.lesserThanOrEqual('')(control)).toEqual({ lesserThanOrEqual: true });
    });

    it('Invalid when sibling is not numeric', () => {
        control = createAbstractControlSpyWithSibling(10, 'abc');

        expect(NumberValidators.lesserThanOrEqual('')(control)).toEqual({ lesserThanOrEqual: true });
    });
});

describe('Number Validators - Digits', () => {
    it('Valid for matching digit count', () => {
        control = createAbstractControlSpy(1234);

        expect(NumberValidators.digits(4)(control)).toBeNull();
    });

    it('Valid for negative integer with matching digit count', () => {
        control = createAbstractControlSpy(-1234);

        expect(NumberValidators.digits(4)(control)).toBeNull();
    });

    it('Valid for numeric string', () => {
        control = createAbstractControlSpy('12345');

        expect(NumberValidators.digits(5)(control)).toBeNull();
    });

    it('Invalid for too few digits', () => {
        control = createAbstractControlSpy(123);

        expect(NumberValidators.digits(4)(control)).toEqual({ digits: true });
    });

    it('Invalid for too many digits', () => {
        control = createAbstractControlSpy(12345);

        expect(NumberValidators.digits(4)(control)).toEqual({ digits: true });
    });

    it('Invalid for non-integer', () => {
        control = createAbstractControlSpy(12.34);

        expect(NumberValidators.digits(4)(control)).toEqual({ digits: true });
    });

    it('Invalid for non-numeric input', () => {
        control = createAbstractControlSpy('abc');

        expect(NumberValidators.digits(3)(control)).toEqual({ digits: true });
    });

    it('Invalid for null input', () => {
        control = createAbstractControlSpy(null);

        expect(NumberValidators.digits(1)(control)).toEqual({ digits: true });
    });
});

describe('Number Validators - Digits Between', () => {
    it('Valid at lower bound', () => {
        control = createAbstractControlSpy(123);

        expect(NumberValidators.digitsBetween(3, 5)(control)).toBeNull();
    });

    it('Valid at upper bound', () => {
        control = createAbstractControlSpy(12345);

        expect(NumberValidators.digitsBetween(3, 5)(control)).toBeNull();
    });

    it('Invalid below lower bound', () => {
        control = createAbstractControlSpy(12);

        expect(NumberValidators.digitsBetween(3, 5)(control)).toEqual({ digitsBetween: true });
    });

    it('Invalid above upper bound', () => {
        control = createAbstractControlSpy(123456);

        expect(NumberValidators.digitsBetween(3, 5)(control)).toEqual({ digitsBetween: true });
    });

    it('Throws when min > max', () => {
        control = createAbstractControlSpy(123);

        expect(() => NumberValidators.digitsBetween(5, 3)(control)).toThrowError(
            RangeValidatorErrors.MinGreaterThanMax
        );
    });

    it('Invalid for non-integer', () => {
        control = createAbstractControlSpy(12.3);

        expect(NumberValidators.digitsBetween(2, 5)(control)).toEqual({ digitsBetween: true });
    });
});

describe('Number Validators - Min Digits', () => {
    it('Valid when digit count equals minimum', () => {
        control = createAbstractControlSpy(123);

        expect(NumberValidators.minDigits(3)(control)).toBeNull();
    });

    it('Valid when digit count exceeds minimum', () => {
        control = createAbstractControlSpy(123456);

        expect(NumberValidators.minDigits(3)(control)).toBeNull();
    });

    it('Invalid below minimum', () => {
        control = createAbstractControlSpy(12);

        expect(NumberValidators.minDigits(3)(control)).toEqual({ minDigits: true });
    });

    it('Invalid for non-numeric', () => {
        control = createAbstractControlSpy('abc');

        expect(NumberValidators.minDigits(1)(control)).toEqual({ minDigits: true });
    });
});

describe('Number Validators - Max Digits', () => {
    it('Valid at maximum', () => {
        control = createAbstractControlSpy(12345);

        expect(NumberValidators.maxDigits(5)(control)).toBeNull();
    });

    it('Valid below maximum', () => {
        control = createAbstractControlSpy(12);

        expect(NumberValidators.maxDigits(5)(control)).toBeNull();
    });

    it('Invalid above maximum', () => {
        control = createAbstractControlSpy(123456);

        expect(NumberValidators.maxDigits(5)(control)).toEqual({ maxDigits: true });
    });

    it('Invalid for non-integer', () => {
        control = createAbstractControlSpy(1.2);

        expect(NumberValidators.maxDigits(5)(control)).toEqual({ maxDigits: true });
    });
});

describe('Number Validators - Decimal', () => {
    it('Valid for exact decimal places', () => {
        control = createAbstractControlSpy('1.23');

        expect(NumberValidators.decimal(2)(control)).toBeNull();
    });

    it('Invalid for too few decimal places', () => {
        control = createAbstractControlSpy('1.2');

        expect(NumberValidators.decimal(2)(control)).toEqual({ decimal: true });
    });

    it('Invalid for too many decimal places', () => {
        control = createAbstractControlSpy('1.234');

        expect(NumberValidators.decimal(2)(control)).toEqual({ decimal: true });
    });

    it('Invalid for integer when exact decimal places required', () => {
        control = createAbstractControlSpy(1);

        expect(NumberValidators.decimal(2)(control)).toEqual({ decimal: true });
    });

    it('Valid for integer when decimal(0)', () => {
        control = createAbstractControlSpy(42);

        expect(NumberValidators.decimal(0)(control)).toBeNull();
    });

    it('Valid in range form (lower bound)', () => {
        control = createAbstractControlSpy('1.2');

        expect(NumberValidators.decimal(1, 3)(control)).toBeNull();
    });

    it('Valid in range form (upper bound)', () => {
        control = createAbstractControlSpy('1.234');

        expect(NumberValidators.decimal(1, 3)(control)).toBeNull();
    });

    it('Invalid below range', () => {
        control = createAbstractControlSpy(1);

        expect(NumberValidators.decimal(1, 3)(control)).toEqual({ decimal: true });
    });

    it('Invalid above range', () => {
        control = createAbstractControlSpy('1.2345');

        expect(NumberValidators.decimal(1, 3)(control)).toEqual({ decimal: true });
    });

    it('Throws when min > max in range form', () => {
        control = createAbstractControlSpy('1.23');

        expect(() => NumberValidators.decimal(3, 1)(control)).toThrowError(RangeValidatorErrors.MinGreaterThanMax);
    });

    it('Invalid for non-numeric input', () => {
        control = createAbstractControlSpy('abc');

        expect(NumberValidators.decimal(2)(control)).toEqual({ decimal: true });
    });
});

describe('Number Validators - Multiple Of', () => {
    it('Valid for an exact multiple', () => {
        control = createAbstractControlSpy(15);

        expect(NumberValidators.multipleOf(5)(control)).toBeNull();
    });

    it('Valid for zero', () => {
        control = createAbstractControlSpy(0);

        expect(NumberValidators.multipleOf(5)(control)).toBeNull();
    });

    it('Valid for negative multiple', () => {
        control = createAbstractControlSpy(-10);

        expect(NumberValidators.multipleOf(5)(control)).toBeNull();
    });

    it('Valid for fractional multiple', () => {
        control = createAbstractControlSpy(1.5);

        expect(NumberValidators.multipleOf(0.5)(control)).toBeNull();
    });

    it('Invalid for non-multiple', () => {
        control = createAbstractControlSpy(7);

        expect(NumberValidators.multipleOf(5)(control)).toEqual({ multipleOf: true });
    });

    it('Invalid for non-numeric input', () => {
        control = createAbstractControlSpy('abc');

        expect(NumberValidators.multipleOf(5)(control)).toEqual({ multipleOf: true });
    });

    it('Invalid for null input', () => {
        control = createAbstractControlSpy(null);

        expect(NumberValidators.multipleOf(5)(control)).toEqual({ multipleOf: true });
    });
});
