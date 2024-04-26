import { AbstractControl } from "@angular/forms";
import { createAbstractControlSpy } from "../utils/test.utils";
import { NumberValidators } from "./number.validators";

let control: jasmine.SpyObj<AbstractControl>;

describe('Number Validators - Range', () => {
    it('Range Validator - Valid if value is in range', () => {
        control = createAbstractControlSpy(1);
        expect(NumberValidators.range(0, 5)(control)).toBeNull();
    });

    it('Range Validator - Invalid if value is not in range', () => {
        control = createAbstractControlSpy(6);
        expect(NumberValidators.range(0, 5)(control)).toEqual({range: true});
    });

    it('Range Validator - Invalid if value is not in range', () => {
        control = createAbstractControlSpy(-3);
        expect(NumberValidators.range(0, 5)(control)).toEqual({range: true});
    });

    it('Range Validator - Valid if value is a string castable to number', () => {
        control = createAbstractControlSpy('0');
        expect(NumberValidators.range(0, 5)(control)).toBeNull();
    });

    it('Range Validator - Invalid if value is a string not castable to number (alpha only)', () => {
        control = createAbstractControlSpy('abc');
        expect(NumberValidators.range(0, 5)(control)).toEqual({range: true});
    });

    it('Range Validator - Invalid if value is a string not castable to number (mix number & alpha)', () => {
        control = createAbstractControlSpy('0a');
        expect(NumberValidators.range(0, 5)(control)).toEqual({range: true});
    });
});
