import { AbstractControl } from '@angular/forms';
import { createAbstractControlSpy, createNullControlSpy, createUndefinedControlSpy } from '../utils/test.utils';
import { BooleanValidators } from './boolean.validators';

let control: jasmine.SpyObj<AbstractControl>;

describe('Boolean Validators - boolean (Laravel parity)', () => {
    it('Boolean - Valid for the literal true', () => {
        control = createAbstractControlSpy(true);

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Valid for the literal false', () => {
        control = createAbstractControlSpy(false);

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Valid for the number 1', () => {
        control = createAbstractControlSpy(1);

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Valid for the number 0', () => {
        control = createAbstractControlSpy(0);

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Valid for the string "1"', () => {
        control = createAbstractControlSpy('1');

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Valid for the string "0"', () => {
        control = createAbstractControlSpy('0');

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Invalid for the string "true"', () => {
        control = createAbstractControlSpy('true');

        expect(BooleanValidators.boolean(control)).toEqual({ boolean: true });
    });

    it('Boolean - Invalid for the number 2', () => {
        control = createAbstractControlSpy(2);

        expect(BooleanValidators.boolean(control)).toEqual({ boolean: true });
    });

    it('Boolean - Invalid for null', () => {
        control = createNullControlSpy();

        expect(BooleanValidators.boolean(control)).toEqual({ boolean: true });
    });

    it('Boolean - Invalid for undefined', () => {
        control = createUndefinedControlSpy();

        expect(BooleanValidators.boolean(control)).toEqual({ boolean: true });
    });
});

describe('Boolean Validators - falsy', () => {
    it('Falsy - Valid for false', () => {
        control = createAbstractControlSpy(false);

        expect(BooleanValidators.falsy(control)).toBeNull();
    });

    it('Falsy - Valid for the number zero', () => {
        control = createAbstractControlSpy(0);

        expect(BooleanValidators.falsy(control)).toBeNull();
    });

    it('Falsy - Valid for the empty string', () => {
        control = createAbstractControlSpy('');

        expect(BooleanValidators.falsy(control)).toBeNull();
    });

    it('Falsy - Valid for null', () => {
        control = createNullControlSpy();

        expect(BooleanValidators.falsy(control)).toBeNull();
    });

    it('Falsy - Valid for undefined', () => {
        control = createUndefinedControlSpy();

        expect(BooleanValidators.falsy(control)).toBeNull();
    });

    it('Falsy - Invalid for true', () => {
        control = createAbstractControlSpy(true);

        expect(BooleanValidators.falsy(control)).toEqual({ falsy: true });
    });

    it('Falsy - Invalid for a non empty string', () => {
        control = createAbstractControlSpy('hello');

        expect(BooleanValidators.falsy(control)).toEqual({ falsy: true });
    });

    it('Falsy - Invalid for a non zero number', () => {
        control = createAbstractControlSpy(42);

        expect(BooleanValidators.falsy(control)).toEqual({ falsy: true });
    });
});

describe('Boolean Validators - truthy', () => {
    it('Truthy - Valid for true', () => {
        control = createAbstractControlSpy(true);

        expect(BooleanValidators.truthy(control)).toBeNull();
    });

    it('Truthy - Valid for a non empty string', () => {
        control = createAbstractControlSpy('hello');

        expect(BooleanValidators.truthy(control)).toBeNull();
    });

    it('Truthy - Valid for a non zero number', () => {
        control = createAbstractControlSpy(42);

        expect(BooleanValidators.truthy(control)).toBeNull();
    });

    it('Truthy - Invalid for false', () => {
        control = createAbstractControlSpy(false);

        expect(BooleanValidators.truthy(control)).toEqual({ truthy: true });
    });

    it('Truthy - Invalid for the number zero', () => {
        control = createAbstractControlSpy(0);

        expect(BooleanValidators.truthy(control)).toEqual({ truthy: true });
    });

    it('Truthy - Invalid for the empty string', () => {
        control = createAbstractControlSpy('');

        expect(BooleanValidators.truthy(control)).toEqual({ truthy: true });
    });

    it('Truthy - Invalid for null', () => {
        control = createNullControlSpy();

        expect(BooleanValidators.truthy(control)).toEqual({ truthy: true });
    });

    it('Truthy - Invalid for undefined', () => {
        control = createUndefinedControlSpy();

        expect(BooleanValidators.truthy(control)).toEqual({ truthy: true });
    });
});
