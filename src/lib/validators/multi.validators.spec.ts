import { AbstractControl } from "@angular/forms";
import { createAbstractControlSpy, createAbstractControlSpyWithSibling } from "../utils/test.utils";
import { MultiValidators } from "./multi.validators";

let control: jasmine.SpyObj<AbstractControl>;

describe('Multi Validators - Different', () => {
    it('Different Validator - Valid if values are different with same type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        expect(MultiValidators.different('', true)(control)).toBeNull();
    });

    it('Different Validator - Valid if values are equal with different type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        expect(MultiValidators.different('', true)(control)).toBeNull();
    });

    it('Different Validator - Invalid if values are equal with same type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        expect(MultiValidators.different('', true)(control)).toEqual({different: true});
    });

    it('Different Validator - Invalid if values are equal with different type (strict disabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        expect(MultiValidators.different('')(control)).toEqual({different: true});
    });
});

describe('String Validators - Ends With', () => {
    it('Ends With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(MultiValidators.endsWith('library')(control)).toBeNull();
    });

    it('Ends With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(MultiValidators.endsWith('nGuard', 'an')(control)).toEqual({endsWith: true});
    });

    it('Ends With - Valid if a number ends with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);
        expect(MultiValidators.endsWith('24')(control)).toBeNull();
    });

    it('Ends With - Invalid if a number doesnt end with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);
        expect(MultiValidators.endsWith('20')(control)).toEqual({endsWith: true});
    });

    it('Ends With - Valid if a boolean ends with the string ue (from true)', () => {
        control = createAbstractControlSpy(true);
        expect(MultiValidators.endsWith('ue')(control)).toBeNull();
    });

    it('Ends With - Invalid if a boolean ends with the character 1', () => {
        control = createAbstractControlSpy(true);
        expect(MultiValidators.endsWith('1')(control)).toEqual({endsWith: true});
    });
});

describe('Multi Validators - Same', () => {
    it('Same - Valid if both fields have the same value', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        expect(MultiValidators.same('')(control)).toBeNull();
    });

    it('Same - Invalid if fields have different values', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        expect(MultiValidators.same('')(control)).toEqual({same: true});
    });

    it('Same Validator - Invalid if values are equal with different type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        expect(MultiValidators.same('', true)(control)).toEqual({same: true});
    });

    it('Same Validator - Valid if values are equal with different type (strict disabled / implicit)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        expect(MultiValidators.same('')(control)).toBeNull();
    });

    it('Same Validator - Valid if values are equal with different type (strict disabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        expect(MultiValidators.same('', false)(control)).toBeNull();
    });
});