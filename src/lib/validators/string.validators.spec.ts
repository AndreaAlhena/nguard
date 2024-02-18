import { AbstractControl } from "@angular/forms";
import { StringValidators } from "./string.validators";
import { createAbstractControlSpy, createAbstractControlSpyWithSibling } from "../utils/test-utils";

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
        control = createAbstractControlSpy('abc字Б123');
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

describe('String Validators - AlphaNum', () => {
    it('AlphaNum - Valid string (ASCII only)', () => {
        control = createAbstractControlSpy('abcABC123');
        expect(StringValidators.alphaNum(true)(control)).toBeNull();
    });

    it('AlphaNum - Invalid string should fail (ASCII only / White space in the middle)', () => {
        control = createAbstractControlSpy('abc 123');
        expect(StringValidators.alphaNum(true)(control)).toEqual({alphaNum: true});
    });

    it('AlphaNum - Invalid string should fail (ASCII only / White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');
        expect(StringValidators.alphaNum(true)(control)).toEqual({alphaNum: true});
    });

    it('AlphaNum - Invalid string should fail (ASCII only / White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');
        expect(StringValidators.alphaNum(true)(control)).toEqual({alphaNum: true});
    });

    it('AlphaNum - Invalid string should fail (ASCII only / japanese character)', () => {
        control = createAbstractControlSpy('字');
        expect(StringValidators.alphaNum(true)(control)).toEqual({alphaNum: true});
    });

    it('AlphaNum - Invalid string should fail (ASCII only / cyrillic character)', () => {
        control = createAbstractControlSpy('Б');
        expect(StringValidators.alphaNum(true)(control)).toEqual({alphaNum: true});
    });

    it('AlphaNum - Invalid string should fail (ASCII only / symbol)', () => {
        control = createAbstractControlSpy('%');
        expect(StringValidators.alphaNum(true)(control)).toEqual({alphaNum: true});
    });

    it('AlphaNum - Valid string', () => {
        control = createAbstractControlSpy('abc字Б123');
        expect(StringValidators.alphaNum()(control)).toBeNull();
    });

    it('AlphaNum - Invalid string should fail (White space in the middle)', () => {
        control = createAbstractControlSpy('abc ABC');
        expect(StringValidators.alphaNum()(control)).toEqual({alphaNum: true});
    });

    it('AlphaNum - Invalid string should fail (White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');
        expect(StringValidators.alphaNum()(control)).toEqual({alphaNum: true});
    });

    it('AlphaNum - Invalid string should fail (White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');
        expect(StringValidators.alphaNum()(control)).toEqual({alphaNum: true});
    });

    it('AlphaNum - Invalid string should fail (symbol)', () => {
        control = createAbstractControlSpy('%');
        expect(StringValidators.alphaNum()(control)).toEqual({alphaNum: true});
    });
});

describe('String Validators - ASCII', () => {
    it('ASCII - Valid string (from char 32 to 126)', () => {
        let str = '';

        for (let i = 32; i <= 126; i++) {
            str += String.fromCharCode(i);
        }

        control = createAbstractControlSpy(str);
        expect(StringValidators.ascii()(control)).toBeNull();
    });

    it('ASCII - Invalid string should fail (japanese character)', () => {
        control = createAbstractControlSpy('字');
        expect(StringValidators.ascii()(control)).toEqual({ascii: true});
    });

    it('ASCII - Invalid string should fail (cyrillic character)', () => {
        control = createAbstractControlSpy('Б');
        expect(StringValidators.ascii()(control)).toEqual({ascii: true});
    });

    it('ASCII - Invalid string should fail (mixed valid and invalid)', () => {
        control = createAbstractControlSpy('123БABC');
        expect(StringValidators.ascii()(control)).toEqual({ascii: true});
    });
});

describe('String Validators - Same', () => {
    it('Same - Valid if both fields have the same value', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        expect(StringValidators.same('')(control)).toBeNull();
    });

    it('Confirmed - Invalid if fields have different values', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        expect(StringValidators.same('')(control)).toEqual({same: true});
    });
});

describe('String Validators - Doesnt Start With', () => {
    it('Doesnt Start With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(StringValidators.doesntStartWith('Angular')(control)).toBeNull();
    });

    it('Doesnt Start With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(StringValidators.doesntStartWith('nguard')(control)).toEqual({doesntStartWith: true});
    });
});

describe('String Validators - Doesnt End With', () => {
    it('Doesnt End With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(StringValidators.doesntStartWith('Angular')(control)).toBeNull();
    });

    it('Doesnt End With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(StringValidators.doesntEndWith('Library')(control)).toEqual({doesntEndWith: true});
    });
});

describe('String Validators - Ends With', () => {
    it('Ends With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(StringValidators.endsWith('library')(control)).toBeNull();
    });

    it('Ends With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(StringValidators.endsWith('nGuard', 'an')(control)).toEqual({endsWith: true});
    });
});

describe('String Validators - Lowercase', () => {
    it('Lowercase - Validate a lowercase string', () => {
        control = createAbstractControlSpy('a lowercase string');
        expect(StringValidators.lowercase()(control)).toBeNull();
    });

    it('Lowercase - Validate a lowercase string with symbols and numbers', () => {
        control = createAbstractControlSpy('4_l0w3rc4s3-str1ng');
        expect(StringValidators.lowercase()(control)).toBeNull();
    });

    it('Lowercase - A non lowercase string is not valid', () => {
        control = createAbstractControlSpy('A nOn LoWeRcAsE sTrInG');
        expect(StringValidators.lowercase()(control)).toEqual({lowercase: true});
    });
});

describe('String Validators - Starts With', () => {
    it('Starts With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(StringValidators.startsWith('angular', 'nguard')(control)).toBeNull();
    });

    it('Starts With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(StringValidators.startsWith('is', 'an')(control)).toEqual({startsWith: true});
    });
});

describe('String Validators - Uppercase', () => {
    it('Uppercase - Validate an uppercase string', () => {
        control = createAbstractControlSpy('AN UPPERCASE STRING');
        expect(StringValidators.uppercase()(control)).toBeNull();
    });

    it('Uppercase - Validate an uppercase string with symbols and numbers', () => {
        control = createAbstractControlSpy('4_L0W3RC4S3-STR1NG');
        expect(StringValidators.uppercase()(control)).toBeNull();
    });

    it('Uppercase - A non uppercase string is not valid', () => {
        control = createAbstractControlSpy('A nOn LoWeRcAsE sTrInG');
        expect(StringValidators.uppercase()(control)).toEqual({uppercase: true});
    });

    it('Uppercase - A non string data type is not valid', () => {
        control = createAbstractControlSpy(1);
        expect(StringValidators.uppercase()(control)).toEqual({uppercase: true});
    });
});