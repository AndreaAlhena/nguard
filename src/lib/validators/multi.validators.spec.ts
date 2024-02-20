import { AbstractControl } from "@angular/forms";
import { createAbstractControlSpyWithSibling } from "../utils/test.utils";
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