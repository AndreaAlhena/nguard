import { AbstractControl } from "@angular/forms";
import { StringValidators } from "./string.validators";
import { createAbstractControlSpy } from "../utils/test-utils";

describe('String Validators', () => {
    let control: jasmine.SpyObj<AbstractControl>;

    it('Alpha - Valid string (ASCII only)', () => {
        control = createAbstractControlSpy('abcABC');
        expect(StringValidators.alpha(true)(control)).toBeNull();
    });

    it('Alpha - Invalid string should fail (ASCII only / White space in the middle)', () => {
        control = createAbstractControlSpy('abc ABC');
        expect(StringValidators.alpha(true)(control)).toEqual({alpha: true});
    });

    it('Alpha - Invalid string should fail (ASCII only / White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');
        expect(StringValidators.alpha(true)(control)).toEqual({alpha: true});
    });

    it('Alpha - Invalid string should fail (ASCII only / White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');
        expect(StringValidators.alpha(true)(control)).toEqual({alpha: true});
    });

    it('Alpha - Invalid string should fail (ASCII only / numbers)', () => {
        control = createAbstractControlSpy('abc3ABC');
        expect(StringValidators.alpha(true)(control)).toEqual({alpha: true});
    });

    it('Alpha - Invalid string should fail (ASCII only / japanese character)', () => {
        control = createAbstractControlSpy('字');
        expect(StringValidators.alpha(true)(control)).toEqual({alpha: true});
    });

    it('Alpha - Invalid string should fail (ASCII only / cyrillic character)', () => {
        control = createAbstractControlSpy('Б');
        expect(StringValidators.alpha(true)(control)).toEqual({alpha: true});
    });

    it('Alpha - Invalid string should fail (ASCII only / symbol)', () => {
        control = createAbstractControlSpy('%');
        expect(StringValidators.alpha(true)(control)).toEqual({alpha: true});
    });

    it('Alpha - Valid string', () => {
        control = createAbstractControlSpy('abc字Б');
        expect(StringValidators.alpha()(control)).toBeNull();
    });

    it('Alpha - Invalid string should fail (White space in the middle)', () => {
        control = createAbstractControlSpy('abc ABC');
        expect(StringValidators.alpha()(control)).toEqual({alpha: true});
    });

    it('Alpha - Invalid string should fail (White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');
        expect(StringValidators.alpha()(control)).toEqual({alpha: true});
    });

    it('Alpha - Invalid string should fail (White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');
        expect(StringValidators.alpha()(control)).toEqual({alpha: true});
    });

    it('Alpha - Invalid string should fail (numbers)', () => {
        control = createAbstractControlSpy('abc3ABC');
        expect(StringValidators.alpha()(control)).toEqual({alpha: true});
    });

    it('Alpha - Invalid string should fail (symbol)', () => {
        control = createAbstractControlSpy('%');
        expect(StringValidators.alpha()(control)).toEqual({alpha: true});
    });
});