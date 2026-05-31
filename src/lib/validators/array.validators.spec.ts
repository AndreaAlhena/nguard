import { AbstractControl, FormControl } from '@angular/forms';
import { createAbstractControlSpy, createAbstractControlSpyWithSibling } from '../utils/test.utils';
import { ArrayValidators } from './array.validators';

let control: jasmine.SpyObj<AbstractControl>;

describe('Array Validators - array', () => {
    it('Valid for an empty array', () => {
        control = createAbstractControlSpy([]);

        expect(ArrayValidators.array(control)).toBeNull();
    });

    it('Valid for a populated array', () => {
        control = createAbstractControlSpy([1, 2, 3]);

        expect(ArrayValidators.array(control)).toBeNull();
    });

    it('Invalid for a string', () => {
        control = createAbstractControlSpy('not an array');

        expect(ArrayValidators.array(control)).toEqual({ array: true });
    });

    it('Invalid for an object', () => {
        control = createAbstractControlSpy({ length: 1 });

        expect(ArrayValidators.array(control)).toEqual({ array: true });
    });

    it('Invalid for null', () => {
        control = createAbstractControlSpy(null);

        expect(ArrayValidators.array(control)).toEqual({ array: true });
    });
});

describe('Array Validators - minSize', () => {
    it('Valid when length equals the minimum', () => {
        control = createAbstractControlSpy([1, 2]);

        expect(ArrayValidators.minSize(2)(control)).toBeNull();
    });

    it('Valid when length exceeds the minimum', () => {
        control = createAbstractControlSpy([1, 2, 3]);

        expect(ArrayValidators.minSize(2)(control)).toBeNull();
    });

    it('Invalid when length is below the minimum', () => {
        control = createAbstractControlSpy([1]);

        expect(ArrayValidators.minSize(2)(control)).toEqual({ minSize: true });
    });

    it('Invalid for a non-array', () => {
        control = createAbstractControlSpy('ab');

        expect(ArrayValidators.minSize(1)(control)).toEqual({ minSize: true });
    });
});

describe('Array Validators - maxSize', () => {
    it('Valid when length equals the maximum', () => {
        control = createAbstractControlSpy([1, 2]);

        expect(ArrayValidators.maxSize(2)(control)).toBeNull();
    });

    it('Valid when length is below the maximum', () => {
        control = createAbstractControlSpy([1]);

        expect(ArrayValidators.maxSize(2)(control)).toBeNull();
    });

    it('Invalid when length exceeds the maximum', () => {
        control = createAbstractControlSpy([1, 2, 3]);

        expect(ArrayValidators.maxSize(2)(control)).toEqual({ maxSize: true });
    });

    it('Invalid for a non-array', () => {
        control = createAbstractControlSpy(null);

        expect(ArrayValidators.maxSize(2)(control)).toEqual({ maxSize: true });
    });
});

describe('Array Validators - sizeBetween', () => {
    it('Valid at the lower bound', () => {
        control = createAbstractControlSpy([1]);

        expect(ArrayValidators.sizeBetween(1, 3)(control)).toBeNull();
    });

    it('Valid at the upper bound', () => {
        control = createAbstractControlSpy([1, 2, 3]);

        expect(ArrayValidators.sizeBetween(1, 3)(control)).toBeNull();
    });

    it('Invalid below the lower bound', () => {
        control = createAbstractControlSpy([]);

        expect(ArrayValidators.sizeBetween(1, 3)(control)).toEqual({ sizeBetween: true });
    });

    it('Invalid above the upper bound', () => {
        control = createAbstractControlSpy([1, 2, 3, 4]);

        expect(ArrayValidators.sizeBetween(1, 3)(control)).toEqual({ sizeBetween: true });
    });

    it('Invalid for a non-array', () => {
        control = createAbstractControlSpy('abc');

        expect(ArrayValidators.sizeBetween(1, 3)(control)).toEqual({ sizeBetween: true });
    });
});

describe('Array Validators - distinct', () => {
    it('Valid for unique primitives', () => {
        control = createAbstractControlSpy([1, 2, 3]);

        expect(ArrayValidators.distinct(control)).toBeNull();
    });

    it('Valid for an empty array', () => {
        control = createAbstractControlSpy([]);

        expect(ArrayValidators.distinct(control)).toBeNull();
    });

    it('Invalid for duplicate primitives', () => {
        control = createAbstractControlSpy([1, 2, 2]);

        expect(ArrayValidators.distinct(control)).toEqual({ distinct: true });
    });

    it('Invalid for duplicate strings', () => {
        control = createAbstractControlSpy(['a', 'b', 'a']);

        expect(ArrayValidators.distinct(control)).toEqual({ distinct: true });
    });

    it('Invalid for a non-array', () => {
        control = createAbstractControlSpy(null);

        expect(ArrayValidators.distinct(control)).toEqual({ distinct: true });
    });
});

describe('Array Validators - contains', () => {
    it('Valid when all required values are present', () => {
        control = createAbstractControlSpy(['a', 'b', 'c']);

        expect(ArrayValidators.contains('a', 'b')(control)).toBeNull();
    });

    it('Invalid when a required value is missing', () => {
        control = createAbstractControlSpy(['a', 'c']);

        expect(ArrayValidators.contains('a', 'b')(control)).toEqual({ contains: true });
    });

    it('Invalid for a non-array', () => {
        control = createAbstractControlSpy('ab');

        expect(ArrayValidators.contains('a')(control)).toEqual({ contains: true });
    });
});

describe('Array Validators - doesntContain', () => {
    it('Valid when none of the forbidden values are present', () => {
        control = createAbstractControlSpy(['a', 'b']);

        expect(ArrayValidators.doesntContain('x', 'y')(control)).toBeNull();
    });

    it('Invalid when a forbidden value is present', () => {
        control = createAbstractControlSpy(['a', 'x']);

        expect(ArrayValidators.doesntContain('x', 'y')(control)).toEqual({ doesntContain: true });
    });

    it('Invalid for a non-array', () => {
        control = createAbstractControlSpy(null);

        expect(ArrayValidators.doesntContain('x')(control)).toEqual({ doesntContain: true });
    });
});

describe('Array Validators - inArray', () => {
    it('Valid when the value is a member of the sibling array', () => {
        control = createAbstractControlSpyWithSibling('red', ['red', 'green']);

        expect(ArrayValidators.inArray('allowedColors')(control)).toBeNull();
    });

    it('Invalid when the value is not a member of the sibling array', () => {
        control = createAbstractControlSpyWithSibling('blue', ['red', 'green']);

        expect(ArrayValidators.inArray('allowedColors')(control)).toEqual({ inArray: true });
    });

    it('Invalid when the sibling is not an array', () => {
        control = createAbstractControlSpyWithSibling('red', 'red');

        expect(ArrayValidators.inArray('allowedColors')(control)).toEqual({ inArray: true });
    });

    it('Valid under loose equality (string vs number)', () => {
        control = createAbstractControlSpyWithSibling('1', [1, 2]);

        expect(ArrayValidators.inArray('ids', false)(control)).toBeNull();
    });

    it('Invalid under strict equality (string vs number)', () => {
        control = createAbstractControlSpyWithSibling('1', [1, 2]);

        expect(ArrayValidators.inArray('ids', true)(control)).toEqual({ inArray: true });
    });
});

describe('Array Validators - arrayOf', () => {
    const isString = (c: AbstractControl) => (typeof c.value === 'string' ? null : { notString: true });

    it('Valid when every item passes the inner validator', () => {
        control = createAbstractControlSpy(['a', 'b']);

        expect(ArrayValidators.arrayOf(isString)(control)).toBeNull();
    });

    it('Valid for an empty array', () => {
        control = createAbstractControlSpy([]);

        expect(ArrayValidators.arrayOf(isString)(control)).toBeNull();
    });

    it('Invalid when an item fails the inner validator', () => {
        control = createAbstractControlSpy(['a', 1]);

        expect(ArrayValidators.arrayOf(isString)(control)).toEqual({ arrayOf: true });
    });

    it('Works with a real nguard validator', () => {
        control = createAbstractControlSpy([5, 'x']);

        expect(ArrayValidators.arrayOf(c => (typeof c.value === 'number' ? null : { num: true }))(control)).toEqual({
            arrayOf: true,
        });
    });

    it('Invalid for a non-array', () => {
        control = createAbstractControlSpy('abc');

        expect(ArrayValidators.arrayOf(isString)(control)).toEqual({ arrayOf: true });
    });

    it('Wraps each item in a FormControl', () => {
        const seen: unknown[] = [];
        const spy = (c: AbstractControl) => {
            seen.push(c.value);
            return null;
        };
        control = createAbstractControlSpy(['a', 'b']);

        ArrayValidators.arrayOf(spy)(control);

        expect(seen).toEqual(['a', 'b']);
        expect(new FormControl('a')).toBeTruthy();
    });
});

describe('Array Validators - requiredArrayKeys', () => {
    it('Valid when the object has all required keys', () => {
        control = createAbstractControlSpy({ id: 1, name: 'x' });

        expect(ArrayValidators.requiredArrayKeys('id', 'name')(control)).toBeNull();
    });

    it('Invalid when a required key is missing', () => {
        control = createAbstractControlSpy({ id: 1 });

        expect(ArrayValidators.requiredArrayKeys('id', 'name')(control)).toEqual({ requiredArrayKeys: true });
    });

    it('Invalid for null', () => {
        control = createAbstractControlSpy(null);

        expect(ArrayValidators.requiredArrayKeys('id')(control)).toEqual({ requiredArrayKeys: true });
    });

    it('Invalid for a primitive', () => {
        control = createAbstractControlSpy('id');

        expect(ArrayValidators.requiredArrayKeys('id')(control)).toEqual({ requiredArrayKeys: true });
    });
});
