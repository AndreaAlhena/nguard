import { AbstractControl } from "@angular/forms";
import { StringValidators } from "./string.validators";
import { createAbstractControlSpy } from "../utils/test-utils";

let control: jasmine.SpyObj<AbstractControl>;

describe('String Validators - Alpha', () => {
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

describe('String Validators - AlphaDash', () => {
    it('AlphaDash - Valid string (ASCII only)', () => {
        control = createAbstractControlSpy('abcABC_-123');
        expect(StringValidators.alphaDash(true)(control)).toBeNull();
    });

    it('AlphaDash - Invalid string should fail (ASCII only / White space in the middle)', () => {
        control = createAbstractControlSpy('abc ABC');
        expect(StringValidators.alphaDash(true)(control)).toEqual({alphaDash: true});
    });

    it('AlphaDash - Invalid string should fail (ASCII only / White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');
        expect(StringValidators.alphaDash(true)(control)).toEqual({alphaDash: true});
    });

    it('AlphaDash - Invalid string should fail (ASCII only / White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');
        expect(StringValidators.alphaDash(true)(control)).toEqual({alphaDash: true});
    });

    it('AlphaDash - Invalid string should fail (ASCII only / japanese character)', () => {
        control = createAbstractControlSpy('字');
        expect(StringValidators.alphaDash(true)(control)).toEqual({alphaDash: true});
    });

    it('AlphaDash - Invalid string should fail (ASCII only / cyrillic character)', () => {
        control = createAbstractControlSpy('Б');
        expect(StringValidators.alphaDash(true)(control)).toEqual({alphaDash: true});
    });

    it('AlphaDash - Invalid string should fail (ASCII only / symbol)', () => {
        control = createAbstractControlSpy('%');
        expect(StringValidators.alphaDash(true)(control)).toEqual({alphaDash: true});
    });

    it('AlphaDash - Valid string', () => {
        control = createAbstractControlSpy('abc字Б');
        expect(StringValidators.alphaDash()(control)).toBeNull();
    });

    it('AlphaDash - Invalid string should fail (White space in the middle)', () => {
        control = createAbstractControlSpy('abc ABC');
        expect(StringValidators.alphaDash()(control)).toEqual({alphaDash: true});
    });

    it('AlphaDash - Invalid string should fail (White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');
        expect(StringValidators.alphaDash()(control)).toEqual({alphaDash: true});
    });

    it('AlphaDash - Invalid string should fail (White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');
        expect(StringValidators.alphaDash()(control)).toEqual({alphaDash: true});
    });

    it('AlphaDash - Invalid string should fail (symbol)', () => {
        control = createAbstractControlSpy('%');
        expect(StringValidators.alphaDash()(control)).toEqual({alphaDash: true});
    });
});