import { AbstractControl } from '@angular/forms';
import { StringValidators } from './string.validators';
import { createAbstractControlSpy } from '../utils/test.utils';

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
