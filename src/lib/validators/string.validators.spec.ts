import { AbstractControl } from '@angular/forms';
import { StringValidators } from './string.validators';
import {
    createAbstractControlSpy,
    createAbstractControlSpyWithSibling,
    createControlSpyWithNullSibling,
    createOrphanControlSpy,
} from '../utils/test.utils';

let control: jasmine.SpyObj<AbstractControl>;

describe('String Validators - Alpha', () => {
    it('Alpha - Valid string (ASCII only)', () => {
        control = createAbstractControlSpy('abcABC');

        expect(StringValidators.alpha(true)(control)).toBeNull();
    });

    it('Alpha - Invalid string should fail (ASCII only / White space in the middle)', () => {
        control = createAbstractControlSpy('abc ABC');

        expect(StringValidators.alpha(true)(control)).toEqual({ alpha: true });
    });

    it('Alpha - Invalid string should fail (ASCII only / White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');

        expect(StringValidators.alpha(true)(control)).toEqual({ alpha: true });
    });

    it('Alpha - Invalid string should fail (ASCII only / White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');

        expect(StringValidators.alpha(true)(control)).toEqual({ alpha: true });
    });

    it('Alpha - Invalid string should fail (ASCII only / numbers)', () => {
        control = createAbstractControlSpy('abc3ABC');

        expect(StringValidators.alpha(true)(control)).toEqual({ alpha: true });
    });

    it('Alpha - Invalid string should fail (ASCII only / japanese character)', () => {
        control = createAbstractControlSpy('字');

        expect(StringValidators.alpha(true)(control)).toEqual({ alpha: true });
    });

    it('Alpha - Invalid string should fail (ASCII only / cyrillic character)', () => {
        control = createAbstractControlSpy('Б');

        expect(StringValidators.alpha(true)(control)).toEqual({ alpha: true });
    });

    it('Alpha - Invalid string should fail (ASCII only / symbol)', () => {
        control = createAbstractControlSpy('%');

        expect(StringValidators.alpha(true)(control)).toEqual({ alpha: true });
    });

    it('Alpha - Valid string', () => {
        control = createAbstractControlSpy('abc字Б');

        expect(StringValidators.alpha()(control)).toBeNull();
    });

    it('Alpha - Invalid string should fail (White space in the middle)', () => {
        control = createAbstractControlSpy('abc ABC');

        expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
    });

    it('Alpha - Invalid string should fail (White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');

        expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
    });

    it('Alpha - Invalid string should fail (White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');

        expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
    });

    it('Alpha - Invalid string should fail (numbers)', () => {
        control = createAbstractControlSpy('abc3ABC');

        expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
    });

    it('Alpha - Invalid string should fail (symbol)', () => {
        control = createAbstractControlSpy('%');

        expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
    });
});

describe('String Validators - AlphaDash', () => {
    it('AlphaDash - Valid string (ASCII only)', () => {
        control = createAbstractControlSpy('abcABC_-123');

        expect(StringValidators.alphaDash(true)(control)).toBeNull();
    });

    it('AlphaDash - Invalid string should fail (ASCII only / White space in the middle)', () => {
        control = createAbstractControlSpy('abc ABC');

        expect(StringValidators.alphaDash(true)(control)).toEqual({ alphaDash: true });
    });

    it('AlphaDash - Invalid string should fail (ASCII only / White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');

        expect(StringValidators.alphaDash(true)(control)).toEqual({ alphaDash: true });
    });

    it('AlphaDash - Invalid string should fail (ASCII only / White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');

        expect(StringValidators.alphaDash(true)(control)).toEqual({ alphaDash: true });
    });

    it('AlphaDash - Invalid string should fail (ASCII only / japanese character)', () => {
        control = createAbstractControlSpy('字');

        expect(StringValidators.alphaDash(true)(control)).toEqual({ alphaDash: true });
    });

    it('AlphaDash - Invalid string should fail (ASCII only / cyrillic character)', () => {
        control = createAbstractControlSpy('Б');

        expect(StringValidators.alphaDash(true)(control)).toEqual({ alphaDash: true });
    });

    it('AlphaDash - Invalid string should fail (ASCII only / symbol)', () => {
        control = createAbstractControlSpy('%');

        expect(StringValidators.alphaDash(true)(control)).toEqual({ alphaDash: true });
    });

    it('AlphaDash - Valid string', () => {
        control = createAbstractControlSpy('abc字Б123');

        expect(StringValidators.alphaDash()(control)).toBeNull();
    });

    it('AlphaDash - Invalid string should fail (White space in the middle)', () => {
        control = createAbstractControlSpy('abc ABC');

        expect(StringValidators.alphaDash()(control)).toEqual({ alphaDash: true });
    });

    it('AlphaDash - Invalid string should fail (White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');

        expect(StringValidators.alphaDash()(control)).toEqual({ alphaDash: true });
    });

    it('AlphaDash - Invalid string should fail (White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');

        expect(StringValidators.alphaDash()(control)).toEqual({ alphaDash: true });
    });

    it('AlphaDash - Invalid string should fail (symbol)', () => {
        control = createAbstractControlSpy('%');

        expect(StringValidators.alphaDash()(control)).toEqual({ alphaDash: true });
    });

    it('AlphaDash - Should allow underscores at start/end', () => {
        control = createAbstractControlSpy('_valid_');

        expect(StringValidators.alphaDash(true)(control)).toBeNull();
    });
});

describe('String Validators - AlphaNum', () => {
    it('AlphaNum - Valid string (ASCII only)', () => {
        control = createAbstractControlSpy('abcABC123');

        expect(StringValidators.alphaNum(true)(control)).toBeNull();
    });

    it('AlphaNum - Invalid string should fail (ASCII only / White space in the middle)', () => {
        control = createAbstractControlSpy('abc 123');

        expect(StringValidators.alphaNum(true)(control)).toEqual({ alphaNum: true });
    });

    it('AlphaNum - Invalid string should fail (ASCII only / White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');

        expect(StringValidators.alphaNum(true)(control)).toEqual({ alphaNum: true });
    });

    it('AlphaNum - Invalid string should fail (ASCII only / White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');

        expect(StringValidators.alphaNum(true)(control)).toEqual({ alphaNum: true });
    });

    it('AlphaNum - Invalid string should fail (ASCII only / japanese character)', () => {
        control = createAbstractControlSpy('字');

        expect(StringValidators.alphaNum(true)(control)).toEqual({ alphaNum: true });
    });

    it('AlphaNum - Invalid string should fail (ASCII only / cyrillic character)', () => {
        control = createAbstractControlSpy('Б');

        expect(StringValidators.alphaNum(true)(control)).toEqual({ alphaNum: true });
    });

    it('AlphaNum - Invalid string should fail (ASCII only / symbol)', () => {
        control = createAbstractControlSpy('%');

        expect(StringValidators.alphaNum(true)(control)).toEqual({ alphaNum: true });
    });

    it('AlphaNum - Valid string', () => {
        control = createAbstractControlSpy('abc字Б123');

        expect(StringValidators.alphaNum()(control)).toBeNull();
    });

    it('AlphaNum - Invalid string should fail (White space in the middle)', () => {
        control = createAbstractControlSpy('abc ABC');

        expect(StringValidators.alphaNum()(control)).toEqual({ alphaNum: true });
    });

    it('AlphaNum - Invalid string should fail (White space at the beginning)', () => {
        control = createAbstractControlSpy(' abcABC');

        expect(StringValidators.alphaNum()(control)).toEqual({ alphaNum: true });
    });

    it('AlphaNum - Invalid string should fail (White space at the end)', () => {
        control = createAbstractControlSpy('abcABC ');

        expect(StringValidators.alphaNum()(control)).toEqual({ alphaNum: true });
    });

    it('AlphaNum - Invalid string should fail (symbol)', () => {
        control = createAbstractControlSpy('%');

        expect(StringValidators.alphaNum()(control)).toEqual({ alphaNum: true });
    });

    it('AlphaNum - Should allow numbers only', () => {
        control = createAbstractControlSpy('12345');

        expect(StringValidators.alphaNum(true)(control)).toBeNull();
    });
});

describe('String Validators - ASCII', () => {
    it('ASCII - Valid string (from char 32 to 126)', () => {
        let str = '';

        for (let i = 32; i <= 126; i++) {
            str += String.fromCharCode(i);
        }

        control = createAbstractControlSpy(str);

        expect(StringValidators.ascii(control)).toBeNull();
    });

    it('ASCII - Invalid string should fail (japanese character)', () => {
        control = createAbstractControlSpy('字');

        expect(StringValidators.ascii(control)).toEqual({ ascii: true });
    });

    it('ASCII - Invalid string should fail (cyrillic character)', () => {
        control = createAbstractControlSpy('Б');

        expect(StringValidators.ascii(control)).toEqual({ ascii: true });
    });

    it('ASCII - Invalid string should fail (mixed valid and invalid)', () => {
        control = createAbstractControlSpy('123БABC');

        expect(StringValidators.ascii(control)).toEqual({ ascii: true });
    });

    it('ASCII - Should reject control characters below 32', () => {
        control = createAbstractControlSpy(String.fromCharCode(31));

        expect(StringValidators.ascii(control)).toEqual({ ascii: true });
    });
});

describe('String Validators - Lowercase', () => {
    it('Lowercase - Validate a lowercase string', () => {
        control = createAbstractControlSpy('a lowercase string');

        expect(StringValidators.lowercase(control)).toBeNull();
    });

    it('Lowercase - Validate a lowercase string with symbols and numbers', () => {
        control = createAbstractControlSpy('4_l0w3rc4s3-str1ng');

        expect(StringValidators.lowercase(control)).toBeNull();
    });

    it('Lowercase - A non lowercase string is not valid', () => {
        control = createAbstractControlSpy('A nOn LoWeRcAsE sTrInG');

        expect(StringValidators.lowercase(control)).toEqual({ lowercase: true });
    });

    it('Lowercase - Should reject empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.lowercase(control)).toEqual({ lowercase: true });
    });

    it('Lowercase - Should handle non-string inputs', () => {
        control = createAbstractControlSpy(null);

        expect(StringValidators.lowercase(control)).toEqual({ lowercase: true });
    });
});

describe('String Validators - Uppercase', () => {
    it('Uppercase - Validate an uppercase string', () => {
        control = createAbstractControlSpy('AN UPPERCASE STRING');

        expect(StringValidators.uppercase(control)).toBeNull();
    });

    it('Uppercase - Validate an uppercase string with symbols and numbers', () => {
        control = createAbstractControlSpy('4_L0W3RC4S3-STR1NG');

        expect(StringValidators.uppercase(control)).toBeNull();
    });

    it('Uppercase - A non uppercase string is not valid', () => {
        control = createAbstractControlSpy('A nOn LoWeRcAsE sTrInG');

        expect(StringValidators.uppercase(control)).toEqual({ uppercase: true });
    });

    it('Uppercase - A non string data type is not valid', () => {
        control = createAbstractControlSpy(1);

        expect(StringValidators.uppercase(control)).toEqual({ uppercase: true });
    });

    it('Uppercase - Should reject empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.uppercase(control)).toEqual({ uppercase: true });
    });
});

describe('String Validators - URL', () => {
    it('URL - Valid with HTTP', () => {
        control = createAbstractControlSpy('http://www.google.com');

        expect(StringValidators.url(control)).toBeNull();
    });

    it('URL - Valid with HTTPS', () => {
        control = createAbstractControlSpy('https://www.google.com');

        expect(StringValidators.url(control)).toBeNull();
    });

    it('URL - Valid without protocol', () => {
        control = createAbstractControlSpy('www.google.com');

        expect(StringValidators.url(control)).toBeNull();
    });

    it('URL - Valid with protocol and no www', () => {
        control = createAbstractControlSpy('https://google.com');

        expect(StringValidators.url(control)).toBeNull();
    });

    it('URL - Valid without protocol and www', () => {
        control = createAbstractControlSpy('google.com');

        expect(StringValidators.url(control)).toBeNull();
    });

    it('URL - Invalid with common text', () => {
        control = createAbstractControlSpy('google');

        expect(StringValidators.url(control)).toEqual({ url: true });
    });

    it('URL - Invalid with empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.url(control)).toEqual({ url: true });
    });

    it('URL - Invalid with number', () => {
        control = createAbstractControlSpy(1);

        expect(StringValidators.url(control)).toEqual({ url: true });
    });

    it('URL - Valid with port number', () => {
        control = createAbstractControlSpy('https://example.com:8080/path');

        expect(StringValidators.url(control)).toBeNull();
    });

    it('URL - Valid with query parameters', () => {
        control = createAbstractControlSpy('https://example.com?query=param');

        expect(StringValidators.url(control)).toBeNull();
    });

    it('URL - Invalid with spaces', () => {
        control = createAbstractControlSpy('https://exa mple.com');

        expect(StringValidators.url(control)).toEqual({ url: true });
    });
});

describe('String Validators - Email', () => {
    it('Email - Valid email address', () => {
        control = createAbstractControlSpy('test@example.com');

        expect(StringValidators.email(control)).toBeNull();
    });

    it('Email - Valid email with subdomain', () => {
        control = createAbstractControlSpy('test@mail.example.com');

        expect(StringValidators.email(control)).toBeNull();
    });

    it('Email - Valid email with plus sign', () => {
        control = createAbstractControlSpy('test+tag@example.com');

        expect(StringValidators.email(control)).toBeNull();
    });

    it('Email - Invalid without @', () => {
        control = createAbstractControlSpy('testexample.com');

        expect(StringValidators.email(control)).toEqual({ email: true });
    });

    it('Email - Invalid without domain', () => {
        control = createAbstractControlSpy('test@');

        expect(StringValidators.email(control)).toEqual({ email: true });
    });

    it('Email - Invalid without local part', () => {
        control = createAbstractControlSpy('@example.com');

        expect(StringValidators.email(control)).toEqual({ email: true });
    });

    it('Email - Invalid with empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.email(control)).toEqual({ email: true });
    });

    it('Email - Invalid with null', () => {
        control = createAbstractControlSpy(null);

        expect(StringValidators.email(control)).toEqual({ email: true });
    });

    it('Email - Invalid with number', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.email(control)).toEqual({ email: true });
    });
});

describe('String Validators - Regex', () => {
    it('Regex - Valid match', () => {
        control = createAbstractControlSpy('ABC123');

        expect(StringValidators.regex(/^[A-Z0-9]+$/)(control)).toBeNull();
    });

    it('Regex - Invalid no match', () => {
        control = createAbstractControlSpy('abc123');

        expect(StringValidators.regex(/^[A-Z0-9]+$/)(control)).toEqual({ regex: true });
    });

    it('Regex - Valid with complex pattern', () => {
        control = createAbstractControlSpy('2024-01-15');

        expect(StringValidators.regex(/^\d{4}-\d{2}-\d{2}$/)(control)).toBeNull();
    });

    it('Regex - Invalid with non-string', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.regex(/^\d+$/)(control)).toEqual({ regex: true });
    });

    it('Regex - Invalid with null', () => {
        control = createAbstractControlSpy(null);

        expect(StringValidators.regex(/^.+$/)(control)).toEqual({ regex: true });
    });

    it('Regex - Invalid with empty string not matching', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.regex(/^.+$/)(control)).toEqual({ regex: true });
    });

    it('Regex - Valid with empty string matching optional pattern', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.regex(/^.*$/)(control)).toBeNull();
    });
});

describe('String Validators - NotRegex', () => {
    it('NotRegex - Valid when pattern does not match', () => {
        control = createAbstractControlSpy('abc');

        expect(StringValidators.notRegex(/\d/)(control)).toBeNull();
    });

    it('NotRegex - Invalid when pattern matches', () => {
        control = createAbstractControlSpy('abc123');

        expect(StringValidators.notRegex(/\d/)(control)).toEqual({ notRegex: true });
    });

    it('NotRegex - Invalid with non-string', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.notRegex(/\d/)(control)).toEqual({ notRegex: true });
    });

    it('NotRegex - Invalid with null', () => {
        control = createAbstractControlSpy(null);

        expect(StringValidators.notRegex(/\d/)(control)).toEqual({ notRegex: true });
    });

    it('NotRegex - Valid with empty string not matching pattern', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.notRegex(/\d/)(control)).toBeNull();
    });
});

describe('String Validators - JSON', () => {
    it('JSON - Valid JSON object', () => {
        control = createAbstractControlSpy('{"key": "value"}');

        expect(StringValidators.json(control)).toBeNull();
    });

    it('JSON - Valid JSON array', () => {
        control = createAbstractControlSpy('[1, 2, 3]');

        expect(StringValidators.json(control)).toBeNull();
    });

    it('JSON - Valid JSON string', () => {
        control = createAbstractControlSpy('"hello"');

        expect(StringValidators.json(control)).toBeNull();
    });

    it('JSON - Valid JSON number', () => {
        control = createAbstractControlSpy('123');

        expect(StringValidators.json(control)).toBeNull();
    });

    it('JSON - Valid JSON boolean', () => {
        control = createAbstractControlSpy('true');

        expect(StringValidators.json(control)).toBeNull();
    });

    it('JSON - Valid JSON null', () => {
        control = createAbstractControlSpy('null');

        expect(StringValidators.json(control)).toBeNull();
    });

    it('JSON - Invalid JSON syntax', () => {
        control = createAbstractControlSpy('{key: value}');

        expect(StringValidators.json(control)).toEqual({ json: true });
    });

    it('JSON - Invalid with empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.json(control)).toEqual({ json: true });
    });

    it('JSON - Invalid with null', () => {
        control = createAbstractControlSpy(null);

        expect(StringValidators.json(control)).toEqual({ json: true });
    });

    it('JSON - Invalid with non-string', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.json(control)).toEqual({ json: true });
    });

    it('JSON - Invalid plain text', () => {
        control = createAbstractControlSpy('hello world');

        expect(StringValidators.json(control)).toEqual({ json: true });
    });
});

describe('String Validators - NotBlank', () => {
    it('NotBlank - Valid with non-empty string', () => {
        control = createAbstractControlSpy('hello');

        expect(StringValidators.notBlank(control)).toBeNull();
    });

    it('NotBlank - Valid with string containing spaces', () => {
        control = createAbstractControlSpy('  hello  ');

        expect(StringValidators.notBlank(control)).toBeNull();
    });

    it('NotBlank - Invalid with empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.notBlank(control)).toEqual({ notBlank: true });
    });

    it('NotBlank - Invalid with whitespace only', () => {
        control = createAbstractControlSpy('   ');

        expect(StringValidators.notBlank(control)).toEqual({ notBlank: true });
    });

    it('NotBlank - Invalid with tabs only', () => {
        control = createAbstractControlSpy('\t\t');

        expect(StringValidators.notBlank(control)).toEqual({ notBlank: true });
    });

    it('NotBlank - Invalid with newlines only', () => {
        control = createAbstractControlSpy('\n\n');

        expect(StringValidators.notBlank(control)).toEqual({ notBlank: true });
    });

    it('NotBlank - Invalid with null', () => {
        control = createAbstractControlSpy(null);

        expect(StringValidators.notBlank(control)).toEqual({ notBlank: true });
    });

    it('NotBlank - Invalid with number', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.notBlank(control)).toEqual({ notBlank: true });
    });
});

describe('String Validators - Edge Cases', () => {
    describe('Null input handling', () => {
        it('Alpha - Should reject null input', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
        });

        it('Alpha (ASCII) - Should reject null input', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.alpha(true)(control)).toEqual({ alpha: true });
        });

        it('AlphaDash - Should reject null input', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.alphaDash()(control)).toEqual({ alphaDash: true });
        });

        it('AlphaDash (ASCII) - Should reject null input', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.alphaDash(true)(control)).toEqual({ alphaDash: true });
        });

        it('AlphaNum - Should reject null input', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.alphaNum()(control)).toEqual({ alphaNum: true });
        });

        it('AlphaNum (ASCII) - Should reject null input', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.alphaNum(true)(control)).toEqual({ alphaNum: true });
        });

        it('ASCII - Should reject null input', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.ascii(control)).toEqual({ ascii: true });
        });

        it('URL - Should reject null input', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.url(control)).toEqual({ url: true });
        });
    });

    describe('Undefined input handling', () => {
        it('Alpha - Should reject undefined input', () => {
            control = createAbstractControlSpy(undefined);

            expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
        });

        it('Alpha (ASCII) - Should reject undefined input', () => {
            control = createAbstractControlSpy(undefined);

            expect(StringValidators.alpha(true)(control)).toEqual({ alpha: true });
        });

        it('AlphaDash - Should reject undefined input', () => {
            control = createAbstractControlSpy(undefined);

            expect(StringValidators.alphaDash()(control)).toEqual({ alphaDash: true });
        });

        it('AlphaDash (ASCII) - Should reject undefined input', () => {
            control = createAbstractControlSpy(undefined);

            expect(StringValidators.alphaDash(true)(control)).toEqual({ alphaDash: true });
        });

        it('AlphaNum - Should reject undefined input', () => {
            control = createAbstractControlSpy(undefined);

            expect(StringValidators.alphaNum()(control)).toEqual({ alphaNum: true });
        });

        it('AlphaNum (ASCII) - Should reject undefined input', () => {
            control = createAbstractControlSpy(undefined);

            expect(StringValidators.alphaNum(true)(control)).toEqual({ alphaNum: true });
        });

        it('ASCII - Should reject undefined input', () => {
            control = createAbstractControlSpy(undefined);

            expect(StringValidators.ascii(control)).toEqual({ ascii: true });
        });

        it('URL - Should reject undefined input', () => {
            control = createAbstractControlSpy(undefined);

            expect(StringValidators.url(control)).toEqual({ url: true });
        });
    });

    describe('Empty string input handling', () => {
        it('Alpha - Should reject empty string', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
        });

        it('Alpha (ASCII) - Should reject empty string', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.alpha(true)(control)).toEqual({ alpha: true });
        });

        it('AlphaDash - Should reject empty string', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.alphaDash()(control)).toEqual({ alphaDash: true });
        });

        it('AlphaDash (ASCII) - Should reject empty string', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.alphaDash(true)(control)).toEqual({ alphaDash: true });
        });

        it('AlphaNum - Should reject empty string', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.alphaNum()(control)).toEqual({ alphaNum: true });
        });

        it('AlphaNum (ASCII) - Should reject empty string', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.alphaNum(true)(control)).toEqual({ alphaNum: true });
        });

        it('ASCII - Should reject empty string', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.ascii(control)).toEqual({ ascii: true });
        });
    });

    describe('Number input handling', () => {
        it('Alpha - Should reject number input', () => {
            control = createAbstractControlSpy(123);

            expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
        });

        it('AlphaDash - Should reject number input', () => {
            control = createAbstractControlSpy(123);

            expect(StringValidators.alphaDash()(control)).toEqual({ alphaDash: true });
        });

        it('AlphaNum - Should reject number input', () => {
            control = createAbstractControlSpy(123);

            expect(StringValidators.alphaNum()(control)).toEqual({ alphaNum: true });
        });

        it('ASCII - Should reject number input', () => {
            control = createAbstractControlSpy(123);

            expect(StringValidators.ascii(control)).toEqual({ ascii: true });
        });

        it('Uppercase - Should reject number input', () => {
            control = createAbstractControlSpy(123);

            expect(StringValidators.uppercase(control)).toEqual({ uppercase: true });
        });
    });

    describe('Boolean input handling', () => {
        it('Alpha - Should reject boolean input (true)', () => {
            control = createAbstractControlSpy(true);

            expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
        });

        it('Alpha - Should reject boolean input (false)', () => {
            control = createAbstractControlSpy(false);

            expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
        });

        it('AlphaDash - Should reject boolean input', () => {
            control = createAbstractControlSpy(true);

            expect(StringValidators.alphaDash()(control)).toEqual({ alphaDash: true });
        });

        it('AlphaNum - Should reject boolean input', () => {
            control = createAbstractControlSpy(true);

            expect(StringValidators.alphaNum()(control)).toEqual({ alphaNum: true });
        });
    });

    describe('Whitespace-only input handling', () => {
        it('Alpha - Should reject whitespace-only string', () => {
            control = createAbstractControlSpy('   ');

            expect(StringValidators.alpha()(control)).toEqual({ alpha: true });
        });

        it('AlphaDash - Should reject whitespace-only string', () => {
            control = createAbstractControlSpy('   ');

            expect(StringValidators.alphaDash()(control)).toEqual({ alphaDash: true });
        });

        it('AlphaNum - Should reject whitespace-only string', () => {
            control = createAbstractControlSpy('   ');

            expect(StringValidators.alphaNum()(control)).toEqual({ alphaNum: true });
        });
    });
});

describe('String Validators - Doesnt End With', () => {
    it('Doesnt End With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.doesntEndWith('Angular')(control)).toBeNull();
    });

    it('Doesnt End With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.doesntEndWith('Library')(control)).toEqual({ doesntEndWith: true });
    });

    it('Doesnt End With - Valid with mixed types', () => {
        control = createAbstractControlSpy('2024');

        expect(StringValidators.doesntEndWith(20)(control)).toBeNull();
    });

    it('Doesnt End With - Invalid with mixed types', () => {
        control = createAbstractControlSpy('2024');

        expect(StringValidators.doesntEndWith(24)(control)).toEqual({ doesntEndWith: true });
    });
});

describe('String Validators - Doesnt Start With', () => {
    it('Doesnt Start With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.doesntStartWith('Angular')(control)).toBeNull();
    });

    it('Doesnt Start With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.doesntStartWith('nguard')(control)).toEqual({ doesntStartWith: true });
    });

    it('Doesnt Start With - Valid with mixed types', () => {
        control = createAbstractControlSpy('2024');

        expect(StringValidators.doesntStartWith(24)(control)).toBeNull();
    });

    it('Doesnt Start With - Invalid with mixed types', () => {
        control = createAbstractControlSpy('2024');

        expect(StringValidators.doesntStartWith(20)(control)).toEqual({ doesntStartWith: true });
    });
});

describe('String Validators - Ends With', () => {
    it('Ends With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.endsWith('library')(control)).toBeNull();
    });

    it('Ends With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.endsWith('nGuard', 'an')(control)).toEqual({ endsWith: true });
    });

    it('Ends With - Valid if a number ends with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);

        expect(StringValidators.endsWith('24')(control)).toBeNull();
    });

    it('Ends With - Invalid if a number doesnt end with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);

        expect(StringValidators.endsWith('20')(control)).toEqual({ endsWith: true });
    });

    it('Ends With - Valid if a boolean ends with the string ue (from true)', () => {
        control = createAbstractControlSpy(true);

        expect(StringValidators.endsWith('ue')(control)).toBeNull();
    });

    it('Ends With - Invalid if a boolean ends with the character 1', () => {
        control = createAbstractControlSpy(true);

        expect(StringValidators.endsWith('1')(control)).toEqual({ endsWith: true });
    });
});

describe('String Validators - Starts With', () => {
    it('Starts With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.startsWith('angular', 'nguard')(control)).toBeNull();
    });

    it('Starts With - Invalid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.startsWith('is', 'an')(control)).toEqual({ startsWith: true });
    });

    it('Starts With - Valid if a number starts with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);

        expect(StringValidators.startsWith('20')(control)).toBeNull();
    });

    it('Starts With - Invalid if a number doesnt start with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);

        expect(StringValidators.startsWith('24')(control)).toEqual({ startsWith: true });
    });

    it('Starts With - Valid if a boolean starts with the string tr (from true)', () => {
        control = createAbstractControlSpy(true);

        expect(StringValidators.startsWith('tr')(control)).toBeNull();
    });

    it('Starts With - Invalid if a boolean starts with the character 1', () => {
        control = createAbstractControlSpy(true);

        expect(StringValidators.startsWith('1')(control)).toEqual({ startsWith: true });
    });
});

describe('String Validators - StartsWith / EndsWith Edge Cases', () => {
    describe('Null/Undefined control value handling', () => {
        it('StartsWith - Should handle null control value', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.startsWith('test')(control)).toEqual({ startsWith: true });
        });

        it('StartsWith - Should handle undefined control value', () => {
            control = createAbstractControlSpy(undefined);

            expect(StringValidators.startsWith('test')(control)).toEqual({ startsWith: true });
        });

        it('EndsWith - Should handle null control value', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.endsWith('test')(control)).toEqual({ endsWith: true });
        });

        it('EndsWith - Should handle undefined control value', () => {
            control = createAbstractControlSpy(undefined);

            expect(StringValidators.endsWith('test')(control)).toEqual({ endsWith: true });
        });

        it('DoesntStartWith - Should handle null control value', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.doesntStartWith('test')(control)).toBeNull();
        });

        it('DoesntEndWith - Should handle null control value', () => {
            control = createAbstractControlSpy(null);

            expect(StringValidators.doesntEndWith('test')(control)).toBeNull();
        });
    });

    describe('Empty string handling', () => {
        it('StartsWith - Should handle empty string control value', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.startsWith('test')(control)).toEqual({ startsWith: true });
        });

        it('EndsWith - Should handle empty string control value', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.endsWith('test')(control)).toEqual({ endsWith: true });
        });

        it('DoesntStartWith - Should pass with empty string control value', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.doesntStartWith('test')(control)).toBeNull();
        });

        it('DoesntEndWith - Should pass with empty string control value', () => {
            control = createAbstractControlSpy('');

            expect(StringValidators.doesntEndWith('test')(control)).toBeNull();
        });
    });

    describe('Empty variadic args handling', () => {
        it('StartsWith - Should fail with no arguments', () => {
            control = createAbstractControlSpy('test');

            expect(StringValidators.startsWith()(control)).toEqual({ startsWith: true });
        });

        it('EndsWith - Should fail with no arguments', () => {
            control = createAbstractControlSpy('test');

            expect(StringValidators.endsWith()(control)).toEqual({ endsWith: true });
        });

        it('DoesntStartWith - Should pass with no arguments', () => {
            control = createAbstractControlSpy('test');

            expect(StringValidators.doesntStartWith()(control)).toBeNull();
        });

        it('DoesntEndWith - Should pass with no arguments', () => {
            control = createAbstractControlSpy('test');

            expect(StringValidators.doesntEndWith()(control)).toBeNull();
        });
    });
});

describe('String Validators - Longer Than', () => {
    it('Valid when current is longer than sibling', () => {
        control = createAbstractControlSpyWithSibling('nGuard is an Angular library', 'short');

        expect(StringValidators.longerThan('')(control)).toBeNull();
    });

    it('Invalid when current has the same length as sibling', () => {
        control = createAbstractControlSpyWithSibling('abc', 'xyz');

        expect(StringValidators.longerThan('')(control)).toEqual({ longerThan: true });
    });

    it('Invalid when current is shorter than sibling', () => {
        control = createAbstractControlSpyWithSibling('a', 'longer');

        expect(StringValidators.longerThan('')(control)).toEqual({ longerThan: true });
    });

    it('Invalid when current is not a string', () => {
        control = createAbstractControlSpyWithSibling(123, 'abc');

        expect(StringValidators.longerThan('')(control)).toEqual({ longerThan: true });
    });

    it('Invalid when sibling is not a string', () => {
        control = createAbstractControlSpyWithSibling('abc', 5);

        expect(StringValidators.longerThan('')(control)).toEqual({ longerThan: true });
    });

    it('Invalid when sibling is null', () => {
        control = createControlSpyWithNullSibling('abc');

        expect(StringValidators.longerThan('')(control)).toEqual({ longerThan: true });
    });

    it('Invalid when control has no parent', () => {
        control = createOrphanControlSpy('abc');

        expect(StringValidators.longerThan('')(control)).toEqual({ longerThan: true });
    });
});

describe('String Validators - Longer or Equal To', () => {
    it('Valid when current is longer than sibling', () => {
        control = createAbstractControlSpyWithSibling('long string', 'short');

        expect(StringValidators.longerOrEqualTo('')(control)).toBeNull();
    });

    it('Valid when current has the same length as sibling', () => {
        control = createAbstractControlSpyWithSibling('abc', 'xyz');

        expect(StringValidators.longerOrEqualTo('')(control)).toBeNull();
    });

    it('Invalid when current is shorter than sibling', () => {
        control = createAbstractControlSpyWithSibling('a', 'longer');

        expect(StringValidators.longerOrEqualTo('')(control)).toEqual({ longerOrEqualTo: true });
    });

    it('Invalid when sibling is not a string', () => {
        control = createAbstractControlSpyWithSibling('abc', 5);

        expect(StringValidators.longerOrEqualTo('')(control)).toEqual({ longerOrEqualTo: true });
    });
});

describe('String Validators - Shorter Than', () => {
    it('Valid when current is shorter than sibling', () => {
        control = createAbstractControlSpyWithSibling('a', 'longer');

        expect(StringValidators.shorterThan('')(control)).toBeNull();
    });

    it('Invalid when current has the same length as sibling', () => {
        control = createAbstractControlSpyWithSibling('abc', 'xyz');

        expect(StringValidators.shorterThan('')(control)).toEqual({ shorterThan: true });
    });

    it('Invalid when current is longer than sibling', () => {
        control = createAbstractControlSpyWithSibling('long string', 'short');

        expect(StringValidators.shorterThan('')(control)).toEqual({ shorterThan: true });
    });

    it('Invalid when current is not a string', () => {
        control = createAbstractControlSpyWithSibling(5, 'abc');

        expect(StringValidators.shorterThan('')(control)).toEqual({ shorterThan: true });
    });

    it('Invalid when control has no parent', () => {
        control = createOrphanControlSpy('abc');

        expect(StringValidators.shorterThan('')(control)).toEqual({ shorterThan: true });
    });
});

describe('String Validators - Shorter or Equal To', () => {
    it('Valid when current is shorter than sibling', () => {
        control = createAbstractControlSpyWithSibling('a', 'longer');

        expect(StringValidators.shorterOrEqualTo('')(control)).toBeNull();
    });

    it('Valid when current has the same length as sibling', () => {
        control = createAbstractControlSpyWithSibling('abc', 'xyz');

        expect(StringValidators.shorterOrEqualTo('')(control)).toBeNull();
    });

    it('Invalid when current is longer than sibling', () => {
        control = createAbstractControlSpyWithSibling('long string', 'short');

        expect(StringValidators.shorterOrEqualTo('')(control)).toEqual({ shorterOrEqualTo: true });
    });

    it('Invalid when sibling is not a string', () => {
        control = createAbstractControlSpyWithSibling('abc', 5);

        expect(StringValidators.shorterOrEqualTo('')(control)).toEqual({ shorterOrEqualTo: true });
    });
});

describe('String Validators - Length', () => {
    it('Valid when length matches exactly', () => {
        control = createAbstractControlSpy('hello');

        expect(StringValidators.length(5)(control)).toBeNull();
    });

    it('Invalid when length is shorter', () => {
        control = createAbstractControlSpy('hi');

        expect(StringValidators.length(5)(control)).toEqual({ length: true });
    });

    it('Invalid when length is longer', () => {
        control = createAbstractControlSpy('hellos');

        expect(StringValidators.length(5)(control)).toEqual({ length: true });
    });

    it('Valid for empty string when length(0)', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.length(0)(control)).toBeNull();
    });

    it('Invalid on non-string input', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.length(5)(control)).toEqual({ length: true });
    });

    it('Invalid on null input', () => {
        control = createAbstractControlSpy(null);

        expect(StringValidators.length(5)(control)).toEqual({ length: true });
    });
});

describe('String Validators - Min Length', () => {
    it('Valid when length equals minimum', () => {
        control = createAbstractControlSpy('hello');

        expect(StringValidators.minLength(5)(control)).toBeNull();
    });

    it('Valid when length exceeds minimum', () => {
        control = createAbstractControlSpy('hello world');

        expect(StringValidators.minLength(5)(control)).toBeNull();
    });

    it('Invalid when length is below minimum', () => {
        control = createAbstractControlSpy('hi');

        expect(StringValidators.minLength(5)(control)).toEqual({ minLength: true });
    });

    it('Invalid on empty string when min > 0', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.minLength(1)(control)).toEqual({ minLength: true });
    });

    it('Invalid on non-string input', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.minLength(2)(control)).toEqual({ minLength: true });
    });
});

describe('String Validators - Max Length', () => {
    it('Valid when length equals maximum', () => {
        control = createAbstractControlSpy('hello');

        expect(StringValidators.maxLength(5)(control)).toBeNull();
    });

    it('Valid when length is below maximum', () => {
        control = createAbstractControlSpy('hi');

        expect(StringValidators.maxLength(5)(control)).toBeNull();
    });

    it('Invalid when length exceeds maximum', () => {
        control = createAbstractControlSpy('hello world');

        expect(StringValidators.maxLength(5)(control)).toEqual({ maxLength: true });
    });

    it('Valid on empty string when max >= 0', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.maxLength(5)(control)).toBeNull();
    });

    it('Invalid on non-string input', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.maxLength(10)(control)).toEqual({ maxLength: true });
    });
});

describe('String Validators - Contains', () => {
    it('Valid when string contains the substring', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.contains('Angular')(control)).toBeNull();
    });

    it('Valid (case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.contains('ANGULAR')(control)).toBeNull();
    });

    it('Valid when string contains at least one of multiple substrings', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.contains('python', 'angular')(control)).toBeNull();
    });

    it('Invalid when string contains none of the substrings', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.contains('python', 'rust')(control)).toEqual({ contains: true });
    });

    it('Invalid when no substrings supplied', () => {
        control = createAbstractControlSpy('anything');

        expect(StringValidators.contains()(control)).toEqual({ contains: true });
    });

    it('Invalid on non-string input', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.contains('1')(control)).toEqual({ contains: true });
    });
});

describe('String Validators - Not Contains', () => {
    it('Valid when string contains none of the substrings', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.notContains('python', 'rust')(control)).toBeNull();
    });

    it('Invalid when string contains a substring', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.notContains('Angular')(control)).toEqual({ notContains: true });
    });

    it('Invalid (case insensitive) when string contains a substring', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.notContains('ANGULAR')(control)).toEqual({ notContains: true });
    });

    it('Invalid when string contains any of multiple substrings', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(StringValidators.notContains('python', 'angular')(control)).toEqual({ notContains: true });
    });

    it('Valid when no substrings supplied', () => {
        control = createAbstractControlSpy('anything');

        expect(StringValidators.notContains()(control)).toBeNull();
    });

    it('Invalid on non-string input', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.notContains('1')(control)).toEqual({ notContains: true });
    });
});

describe('String Validators - UUID', () => {
    it('Valid UUID v4', () => {
        control = createAbstractControlSpy('550e8400-e29b-41d4-a716-446655440000');

        expect(StringValidators.uuid(control)).toBeNull();
    });

    it('Valid UUID v1', () => {
        control = createAbstractControlSpy('e8b9a8e6-7c92-11ed-a1eb-0242ac120002');

        expect(StringValidators.uuid(control)).toBeNull();
    });

    it('Invalid for malformed UUID', () => {
        control = createAbstractControlSpy('not-a-uuid');

        expect(StringValidators.uuid(control)).toEqual({ uuid: true });
    });

    it('Invalid for empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.uuid(control)).toEqual({ uuid: true });
    });

    it('Invalid for non-string input', () => {
        control = createAbstractControlSpy(12345);

        expect(StringValidators.uuid(control)).toEqual({ uuid: true });
    });
});

describe('String Validators - ULID', () => {
    it('Valid ULID', () => {
        control = createAbstractControlSpy('01H8XGJWBWBAQ4N4S6EBT5T6XR');

        expect(StringValidators.ulid(control)).toBeNull();
    });

    it('Invalid when length is wrong', () => {
        control = createAbstractControlSpy('01H8XGJWBWBAQ4N4S6EBT5T6X');

        expect(StringValidators.ulid(control)).toEqual({ ulid: true });
    });

    it('Invalid for non-Crockford characters', () => {
        control = createAbstractControlSpy('01H8XGJWBWBAQ4N4S6EBT5T6IL');

        expect(StringValidators.ulid(control)).toEqual({ ulid: true });
    });

    it('Invalid for empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.ulid(control)).toEqual({ ulid: true });
    });
});

describe('String Validators - Hex Color', () => {
    it('Valid 6-digit hex color', () => {
        control = createAbstractControlSpy('#ffffff');

        expect(StringValidators.hexColor(control)).toBeNull();
    });

    it('Valid 3-digit hex color', () => {
        control = createAbstractControlSpy('#fff');

        expect(StringValidators.hexColor(control)).toBeNull();
    });

    it('Valid 8-digit hex color (with alpha)', () => {
        control = createAbstractControlSpy('#ffffffff');

        expect(StringValidators.hexColor(control)).toBeNull();
    });

    it('Valid hex color without leading hash', () => {
        control = createAbstractControlSpy('ffffff');

        expect(StringValidators.hexColor(control)).toBeNull();
    });

    it('Invalid color name', () => {
        control = createAbstractControlSpy('red');

        expect(StringValidators.hexColor(control)).toEqual({ hexColor: true });
    });

    it('Invalid 5-digit hex', () => {
        control = createAbstractControlSpy('#fffff');

        expect(StringValidators.hexColor(control)).toEqual({ hexColor: true });
    });

    it('Invalid for empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.hexColor(control)).toEqual({ hexColor: true });
    });
});

describe('String Validators - Slug', () => {
    it('Valid lowercase slug', () => {
        control = createAbstractControlSpy('my-blog-post');

        expect(StringValidators.slug(control)).toBeNull();
    });

    it('Valid alphanumeric slug', () => {
        control = createAbstractControlSpy('post-2024-update');

        expect(StringValidators.slug(control)).toBeNull();
    });

    it('Valid single-word slug', () => {
        control = createAbstractControlSpy('hello');

        expect(StringValidators.slug(control)).toBeNull();
    });

    it('Invalid with uppercase letters', () => {
        control = createAbstractControlSpy('My-Post');

        expect(StringValidators.slug(control)).toEqual({ slug: true });
    });

    it('Invalid with leading dash', () => {
        control = createAbstractControlSpy('-leading');

        expect(StringValidators.slug(control)).toEqual({ slug: true });
    });

    it('Invalid with trailing dash', () => {
        control = createAbstractControlSpy('trailing-');

        expect(StringValidators.slug(control)).toEqual({ slug: true });
    });

    it('Invalid with consecutive dashes', () => {
        control = createAbstractControlSpy('double--dash');

        expect(StringValidators.slug(control)).toEqual({ slug: true });
    });

    it('Invalid with whitespace', () => {
        control = createAbstractControlSpy('hello world');

        expect(StringValidators.slug(control)).toEqual({ slug: true });
    });
});

describe('String Validators - String', () => {
    it('Valid for a string', () => {
        control = createAbstractControlSpy('hello');

        expect(StringValidators.string(control)).toBeNull();
    });

    it('Valid for an empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.string(control)).toBeNull();
    });

    it('Invalid for a number', () => {
        control = createAbstractControlSpy(42);

        expect(StringValidators.string(control)).toEqual({ string: true });
    });

    it('Invalid for null', () => {
        control = createAbstractControlSpy(null);

        expect(StringValidators.string(control)).toEqual({ string: true });
    });

    it('Invalid for undefined', () => {
        control = createAbstractControlSpy(undefined);

        expect(StringValidators.string(control)).toEqual({ string: true });
    });

    it('Invalid for boolean', () => {
        control = createAbstractControlSpy(true);

        expect(StringValidators.string(control)).toEqual({ string: true });
    });

    it('Invalid for an object', () => {
        control = createAbstractControlSpy({});

        expect(StringValidators.string(control)).toEqual({ string: true });
    });
});

describe('String Validators - IPv4', () => {
    it('Valid standard IPv4', () => {
        control = createAbstractControlSpy('192.168.1.1');

        expect(StringValidators.ipv4(control)).toBeNull();
    });

    it('Valid edge IPv4 (0.0.0.0)', () => {
        control = createAbstractControlSpy('0.0.0.0');

        expect(StringValidators.ipv4(control)).toBeNull();
    });

    it('Valid edge IPv4 (255.255.255.255)', () => {
        control = createAbstractControlSpy('255.255.255.255');

        expect(StringValidators.ipv4(control)).toBeNull();
    });

    it('Invalid out-of-range octet', () => {
        control = createAbstractControlSpy('256.0.0.1');

        expect(StringValidators.ipv4(control)).toEqual({ ipv4: true });
    });

    it('Invalid missing octet', () => {
        control = createAbstractControlSpy('192.168.1');

        expect(StringValidators.ipv4(control)).toEqual({ ipv4: true });
    });

    it('Invalid for IPv6 input', () => {
        control = createAbstractControlSpy('2001:db8::1');

        expect(StringValidators.ipv4(control)).toEqual({ ipv4: true });
    });

    it('Invalid for empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.ipv4(control)).toEqual({ ipv4: true });
    });

    it('Invalid for non-string input', () => {
        control = createAbstractControlSpy(192168);

        expect(StringValidators.ipv4(control)).toEqual({ ipv4: true });
    });
});

describe('String Validators - IPv6', () => {
    it('Valid full IPv6', () => {
        control = createAbstractControlSpy('2001:0db8:85a3:0000:0000:8a2e:0370:7334');

        expect(StringValidators.ipv6(control)).toBeNull();
    });

    it('Valid compressed IPv6', () => {
        control = createAbstractControlSpy('2001:db8::1');

        expect(StringValidators.ipv6(control)).toBeNull();
    });

    it('Valid loopback', () => {
        control = createAbstractControlSpy('::1');

        expect(StringValidators.ipv6(control)).toBeNull();
    });

    it('Valid unspecified', () => {
        control = createAbstractControlSpy('::');

        expect(StringValidators.ipv6(control)).toBeNull();
    });

    it('Invalid for IPv4 input', () => {
        control = createAbstractControlSpy('192.168.1.1');

        expect(StringValidators.ipv6(control)).toEqual({ ipv6: true });
    });

    it('Invalid for empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.ipv6(control)).toEqual({ ipv6: true });
    });
});

describe('String Validators - IP', () => {
    it('Valid IPv4 input', () => {
        control = createAbstractControlSpy('192.168.1.1');

        expect(StringValidators.ip(control)).toBeNull();
    });

    it('Valid IPv6 input', () => {
        control = createAbstractControlSpy('2001:db8::1');

        expect(StringValidators.ip(control)).toBeNull();
    });

    it('Invalid for malformed input', () => {
        control = createAbstractControlSpy('not-an-ip');

        expect(StringValidators.ip(control)).toEqual({ ip: true });
    });

    it('Invalid for empty string', () => {
        control = createAbstractControlSpy('');

        expect(StringValidators.ip(control)).toEqual({ ip: true });
    });
});
