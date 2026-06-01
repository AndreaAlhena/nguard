import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { type CountryCode, isValidPhoneNumber } from 'libphonenumber-js';
import { primitive } from '../utils/validators.utils';

const isString = (value: unknown): value is string => typeof value === 'string';

const _compareLength = (value: unknown, target: unknown, op: '>' | '>=' | '<' | '<='): boolean => {
    if (!isString(value) || !isString(target)) {
        return false;
    }
    const a = value.length;
    const b = target.length;
    switch (op) {
        case '>':
            return a > b;
        case '>=':
            return a >= b;
        case '<':
            return a < b;
        case '<=':
            return a <= b;
    }
};

const _compareLengthLiteral = (value: unknown, target: number, op: '>' | '>=' | '<' | '<=' | '==='): boolean => {
    if (!isString(value)) {
        return false;
    }
    const a = value.length;
    switch (op) {
        case '>':
            return a > target;
        case '>=':
            return a >= target;
        case '<':
            return a < target;
        case '<=':
            return a <= target;
        case '===':
            return a === target;
    }
};

const _luhnValid = (digits: string): boolean => {
    let sum = 0;
    let double = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let d = digits.charCodeAt(i) - 48;
        if (double) {
            d *= 2;
            if (d > 9) {
                d -= 9;
            }
        }
        sum += d;
        double = !double;
    }
    return sum % 10 === 0;
};

const _IBAN_LENGTHS: Record<string, number> = {
    AD: 24,
    AT: 20,
    BE: 16,
    CH: 21,
    CZ: 24,
    DE: 22,
    DK: 18,
    ES: 24,
    FI: 18,
    FR: 27,
    GB: 22,
    IE: 22,
    IT: 27,
    NL: 18,
    NO: 15,
    PL: 28,
    PT: 25,
    SE: 24,
};

const _ibanMod97 = (iban: string): number => {
    const rearranged = iban.slice(4) + iban.slice(0, 4);
    const numeric = rearranged.replace(/[A-Z]/g, (ch: string) => String(ch.charCodeAt(0) - 55));
    let remainder = 0;
    for (let i = 0; i < numeric.length; i++) {
        remainder = (remainder * 10 + (numeric.charCodeAt(i) - 48)) % 97;
    }
    return remainder;
};

const _POSTAL_PATTERNS: Record<string, RegExp> = {
    AU: /^\d{4}$/,
    CA: /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
    DE: /^\d{5}$/,
    ES: /^\d{5}$/,
    FR: /^\d{5}$/,
    GB: /^[A-Za-z]{1,2}\d[A-Za-z\d]? ?\d[A-Za-z]{2}$/,
    IT: /^\d{5}$/,
    JP: /^\d{3}-?\d{4}$/,
    NL: /^\d{4} ?[A-Za-z]{2}$/,
    US: /^\d{5}(-\d{4})?$/,
};

const _VAT_PATTERNS: Record<string, RegExp> = {
    AT: /^ATU\d{8}$/,
    BE: /^BE0\d{9}$/,
    DE: /^DE\d{9}$/,
    DK: /^DK\d{8}$/,
    ES: /^ES[A-Z0-9]\d{7}[A-Z0-9]$/,
    FR: /^FR[A-Z0-9]{2}\d{9}$/,
    GB: /^GB(\d{9}|\d{12}|GD\d{3}|HA\d{3})$/,
    IT: /^IT\d{11}$/,
    NL: /^NL\d{9}B\d{2}$/,
    PL: /^PL\d{10}$/,
};

export namespace StringValidators {
    /**
     * Validate that an attribute contains only Unicode alphabetic characters (matched by \p{L} and \p{M})
     * If the hasAsciiOnly flag is set to true, the validation is restricted by characters in the ASCII range
     * (a-z and A-Z)
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.String.alpha() // or NguardValidators.String.alpha(true)
     * ])
     * ```
     * @param {boolean} hasAsciiOnly If true, limits characters to ASCII chars (a-z and A-Z)
     * @return {ValidatorFn}
     */
    export const alpha = (hasAsciiOnly: boolean = false) => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!isString(c.value) || c.value.length === 0) {
                return { alpha: true };
            }
            const regEx: RegExp = hasAsciiOnly ? /^[a-zA-Z]+$/u : /^[\p{L}\p{M}]+$/u;

            return regEx.test(c.value) ? null : { alpha: true };
        };
    };

    /**
     * Validate that an attribute contains only Unicode alphanumeric characters (matched by \p{L}, \p{M} and \p{N}), dash and underscores
     * If the hasAsciiOnly flag is set to true, the validation is restricted by characters in the ASCII range
     * (a-z, A-Z and 0-9), dashes and underscores
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.String.alphaDash() // or NguardValidators.String.alphaDash(true)
     * ])
     * ```
     * @param {boolean} hasAsciiOnly If true, limits characters to ASCII chars (a-z and A-Z)
     * @return {ValidatorFn}
     */
    export const alphaDash = (hasAsciiOnly: boolean = false) => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!isString(c.value) || c.value.length === 0) {
                return { alphaDash: true };
            }
            const regEx: RegExp = hasAsciiOnly ? /^[a-zA-Z0-9_-]+$/u : /^[\p{L}\p{M}\p{N}_-]+$/u;

            return regEx.test(c.value) ? null : { alphaDash: true };
        };
    };

    /**
     * Validate that an attribute contains only Unicode alphanumeric characters (matched by \p{L} and \p{M})
     * If the hasAsciiOnly flag is set to true, the validation is restricted by characters in the ASCII range
     * (a-z, A-Z and 0-9)
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.String.alphaNum() // or NguardValidators.String.alphaNum(true)
     * ])
     * ```
     * @param {boolean} hasAsciiOnly If true, limits characters to ASCII chars (a-z and A-Z)
     * @return {ValidatorFn}
     */
    export const alphaNum = (hasAsciiOnly: boolean = false) => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!isString(c.value) || c.value.length === 0) {
                return { alphaNum: true };
            }
            const regEx: RegExp = hasAsciiOnly ? /^[a-zA-Z0-9]+$/u : /^[\p{L}\p{M}\p{N}]+$/u;

            return regEx.test(c.value) ? null : { alphaNum: true };
        };
    };

    /**
     * Validate that an attribute contains only ASCII characters from the standard table:
     *   - Horizontal tab
     *   - Line Feed
     *   - Carriage Return
     *   - Chars included from space to ~
     *
     * Characters from the extended ASCII table are NOT valid
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.String.ascii
     * ])
     * ```
     * @return {ValidationErrors | null}
     */
    export const ascii = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { ascii: true };
        }
        // eslint-disable-next-line no-control-regex
        return /^[\x09\x0A\x0D\x20-\x7E]+$/.test(c.value) ? null : { ascii: true };
    };

    /**
     * Validate that an attribute doesn't end with one of the given values.
     * The performed check is case insensitive
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.String.doesntEndWith('first', 'second', 'third')
     * ])
     * ```
     * @return {ValidatorFn}
     */
    export const doesntEndWith = (...values: primitive[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (`${control.value}`.toLowerCase().endsWith(`${value}`.toLowerCase())) {
                    return {
                        doesntEndWith: true,
                    };
                }
            }

            return null;
        };
    };

    /**
     * Validate that an attribute doesn't start with one of the given values.
     * The performed check is case insensitive
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.String.doesntStartWith('first', 'second', 'third')
     * ])
     * ```
     * @return {ValidatorFn}
     */
    export const doesntStartWith = (...values: primitive[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (`${control.value}`.toLowerCase().startsWith(`${value}`.toLowerCase())) {
                    return {
                        doesntStartWith: true,
                    };
                }
            }

            return null;
        };
    };

    /**
     * Validate that the attribute contains at least one of the given substrings.
     * The performed check is case insensitive.
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.String.contains('first', 'second', 'third')
     * ])
     * ```
     *
     * @param {primitive[]} values A mixed array of primitive values
     * @return {ValidatorFn}
     */
    export const contains = (...values: primitive[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!isString(control.value)) {
                return { contains: true };
            }
            const haystack = control.value.toLowerCase();
            for (const value of values) {
                if (haystack.includes(`${value}`.toLowerCase())) {
                    return null;
                }
            }
            return { contains: true };
        };
    };

    /**
     * The field under validation must be a valid email address (RFC 5322 compliant)
     *
     * ```
     * new FormControl('', [NguardValidators.String.email]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const email = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { email: true };
        }
        // RFC 5322 compliant email regex
        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(c.value) ? null : { email: true };
    };

    /**
     * Validate that an attribute ends with one of the given values.
     * The performed check is case insensitive
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.String.endsWith('first', 'second', 'third')
     * ])
     * ```
     *
     * @param {primitive[]} values A mixed array of primitive values (strings, numbers and boolean)
     * @return {ValidatorFn}
     */
    export const endsWith = (...values: primitive[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (`${control.value}`.toLowerCase().endsWith(`${value}`.toLowerCase())) {
                    return null;
                }
            }

            return {
                endsWith: true,
            };
        };
    };

    /**
     * The field under validation must be a valid JSON string
     *
     * ```
     * new FormControl('', [NguardValidators.String.json]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const json = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { json: true };
        }
        try {
            JSON.parse(c.value);
            return null;
        } catch {
            return { json: true };
        }
    };

    /**
     * The field under validation must be a valid IPv4 address (four 0-255 octets, dotted notation).
     *
     * ```
     * new FormControl('', [NguardValidators.String.ipv4]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const ipv4 = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { ipv4: true };
        }
        return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(c.value)
            ? null
            : { ipv4: true };
    };

    /**
     * The field under validation must be a valid IPv6 address. Accepts full and compressed forms.
     *
     * ```
     * new FormControl('', [NguardValidators.String.ipv6]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const ipv6 = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { ipv6: true };
        }
        const ipv6Regex =
            /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
        return ipv6Regex.test(c.value) ? null : { ipv6: true };
    };

    /**
     * The field under validation must be a valid IP address (IPv4 or IPv6).
     *
     * ```
     * new FormControl('', [NguardValidators.String.ip]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const ip = (c: AbstractControl): ValidationErrors | null => {
        return ipv4(c) === null || ipv6(c) === null ? null : { ip: true };
    };

    /**
     * The field under validation must be a string of exactly the given length.
     *
     * ```
     * code: new FormControl('', [StringValidators.length(6)]),
     * ```
     *
     * @param {number} n The required string length
     * @returns {ValidatorFn}
     */
    export const length = (n: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null =>
            _compareLengthLiteral(c.value, n, '===') ? null : { length: true };
    };

    /**
     * The field under validation must be a string of length less than or equal to the given maximum.
     *
     * ```
     * username: new FormControl('', [StringValidators.maxLength(20)]),
     * ```
     *
     * @param {number} n The maximum allowed length
     * @returns {ValidatorFn}
     */
    export const maxLength = (n: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null =>
            _compareLengthLiteral(c.value, n, '<=') ? null : { maxLength: true };
    };

    /**
     * The field under validation must be a string of length greater than or equal to the given minimum.
     *
     * ```
     * password: new FormControl('', [StringValidators.minLength(8)]),
     * ```
     *
     * @param {number} n The minimum required length
     * @returns {ValidatorFn}
     */
    export const minLength = (n: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null =>
            _compareLengthLiteral(c.value, n, '>=') ? null : { minLength: true };
    };

    /**
     * The field under validation must be a string strictly longer than another field's string.
     * Both values must be strings; non-string inputs (including the sibling) cause the validator to fail.
     *
     * ```
     * password: new FormControl(''),
     * fullPassword: new FormControl('', [StringValidators.longerThan('password')]),
     * ```
     *
     * @param {string} fieldKey The key of the sibling field whose length is the target
     * @returns {ValidatorFn}
     */
    export const longerThan = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null =>
            _compareLength(c.value, c.parent?.get(fieldKey)?.value, '>') ? null : { longerThan: true };
    };

    /**
     * The field under validation must be a string longer than or equal in length to another field's string.
     *
     * ```
     * minPassword: new FormControl(''),
     * password: new FormControl('', [StringValidators.longerOrEqualTo('minPassword')]),
     * ```
     *
     * @param {string} fieldKey The key of the sibling field whose length is the target
     * @returns {ValidatorFn}
     */
    export const longerOrEqualTo = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null =>
            _compareLength(c.value, c.parent?.get(fieldKey)?.value, '>=') ? null : { longerOrEqualTo: true };
    };

    /**
     * The field under validation must be lowercase
     *
     * ```
     * new FormControl('', [NguardValidators.String.lowercase]),
     * ```
     * @return {ValidationErrors | null}
     */
    export const lowercase = (c: AbstractControl): ValidationErrors | null =>
        isString(c.value) && c.value.length > 0 && c.value.toLowerCase() === c.value ? null : { lowercase: true };

    /**
     * The field under validation must be a valid MAC address. Accepts colon-separated
     * (`00:1B:44:11:3A:B7`), dash-separated (`00-1B-44-11-3A-B7`), and Cisco dot-separated
     * (`001B.4411.3AB7`) formats.
     *
     * ```
     * new FormControl('', [NguardValidators.String.macAddress]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const macAddress = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { macAddress: true };
        }
        // Backreference \1 forces the same separator (`:` or `-`) across every octet.
        return /^[0-9A-Fa-f]{2}([:-])(?:[0-9A-Fa-f]{2}\1){4}[0-9A-Fa-f]{2}$|^([0-9A-Fa-f]{4}\.){2}[0-9A-Fa-f]{4}$/.test(
            c.value
        )
            ? null
            : { macAddress: true };
    };

    /**
     * The field under validation must not be empty or contain only whitespace
     *
     * ```
     * new FormControl('', [NguardValidators.String.notBlank]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const notBlank = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value)) {
            return { notBlank: true };
        }
        return c.value.trim().length > 0 ? null : { notBlank: true };
    };

    /**
     * Validate that the attribute contains none of the given substrings.
     * The performed check is case insensitive.
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.String.notContains('badword', 'forbidden')
     * ])
     * ```
     *
     * @param {primitive[]} values A mixed array of primitive values
     * @return {ValidatorFn}
     */
    export const notContains = (...values: primitive[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!isString(control.value)) {
                return { notContains: true };
            }
            const haystack = control.value.toLowerCase();
            for (const value of values) {
                if (haystack.includes(`${value}`.toLowerCase())) {
                    return { notContains: true };
                }
            }
            return null;
        };
    };

    /**
     * The field under validation must NOT match the given regular expression pattern
     *
     * ```
     * new FormControl('', [NguardValidators.String.notRegex(/\d/)]),
     * ```
     *
     * @param {RegExp} pattern The regular expression that should not match
     * @returns {ValidatorFn}
     */
    export const notRegex = (pattern: RegExp): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!isString(c.value)) {
                return { notRegex: true };
            }
            return pattern.test(c.value) ? { notRegex: true } : null;
        };
    };

    /**
     * The field under validation must match the given regular expression pattern
     *
     * ```
     * new FormControl('', [NguardValidators.String.regex(/^[A-Z]{3}$/)]),
     * ```
     *
     * @param {RegExp} pattern The regular expression to match against
     * @returns {ValidatorFn}
     */
    export const regex = (pattern: RegExp): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!isString(c.value)) {
                return { regex: true };
            }
            return pattern.test(c.value) ? null : { regex: true };
        };
    };

    /**
     * The field under validation must be a string strictly shorter than another field's string.
     * Both values must be strings; non-string inputs (including the sibling) cause the validator to fail.
     *
     * ```
     * abbreviation: new FormControl('', [StringValidators.shorterThan('fullName')]),
     * fullName: new FormControl(''),
     * ```
     *
     * @param {string} fieldKey The key of the sibling field whose length is the target
     * @returns {ValidatorFn}
     */
    export const shorterThan = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null =>
            _compareLength(c.value, c.parent?.get(fieldKey)?.value, '<') ? null : { shorterThan: true };
    };

    /**
     * The field under validation must be a string shorter than or equal in length to another field's string.
     *
     * ```
     * abbreviation: new FormControl('', [StringValidators.shorterOrEqualTo('fullName')]),
     * fullName: new FormControl(''),
     * ```
     *
     * @param {string} fieldKey The key of the sibling field whose length is the target
     * @returns {ValidatorFn}
     */
    export const shorterOrEqualTo = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null =>
            _compareLength(c.value, c.parent?.get(fieldKey)?.value, '<=') ? null : { shorterOrEqualTo: true };
    };

    /**
     * The field under validation must be a valid hex color: 3, 4, 6, or 8 hex digits, with an optional leading `#`.
     *
     * ```
     * new FormControl('', [NguardValidators.String.hexColor]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const hexColor = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { hexColor: true };
        }
        return /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(c.value) ? null : { hexColor: true };
    };

    /**
     * The field under validation must be a valid URL slug — lowercase alphanumeric characters separated by single dashes,
     * with no leading, trailing, or consecutive dashes.
     *
     * ```
     * new FormControl('', [NguardValidators.String.slug]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const slug = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { slug: true };
        }
        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.value) ? null : { slug: true };
    };

    /**
     * The field under validation must be a valid ULID — 26 characters in Crockford base32 (excludes I, L, O, U).
     *
     * ```
     * new FormControl('', [NguardValidators.String.ulid]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const ulid = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { ulid: true };
        }
        return /^[0-9A-HJKMNP-TV-Z]{26}$/i.test(c.value) ? null : { ulid: true };
    };

    /**
     * The field under validation must be a valid UUID (v1-v5 per RFC 4122).
     *
     * ```
     * new FormControl('', [NguardValidators.String.uuid]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const uuid = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { uuid: true };
        }
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(c.value)
            ? null
            : { uuid: true };
    };

    /**
     * Validate that an attribute starts with one of the given values.
     * The performed check is case insensitive
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.String.startsWith('first', 'second', 'third')
     * ])
     * ```
     *
     * @param {primitive[]} values A mixed array of primitive values (strings, numbers and boolean)
     * @return {ValidatorFn}
     */
    export const startsWith = (...values: primitive[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (`${control.value}`.toLowerCase().startsWith(`${value}`.toLowerCase())) {
                    return null;
                }
            }

            return {
                startsWith: true,
            };
        };
    };

    /**
     * The field under validation must be a string (`typeof === 'string'`).
     * Companion to Laravel's `string` rule. Useful when explicit type guarding is needed
     * separately from any other constraint.
     *
     * ```
     * new FormControl('', [NguardValidators.String.string]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const string = (c: AbstractControl): ValidationErrors | null =>
        isString(c.value) ? null : { string: true };

    /**
     * The field under validation must be uppercase
     *
     * ```
     * new FormControl('', [NguardValidators.String.uppercase]),
     * ```
     * @return {ValidationErrors | null}
     */
    export const uppercase = (c: AbstractControl<string>): ValidationErrors | null =>
        isString(c.value) && c.value.length > 0 && c.value.toUpperCase() === c.value ? null : { uppercase: true };

    /**
     * The field under validation must be a valid URL as...
     *   - http://www.domain.com
     *   - https://www.domain.com
     *   - www.domain.com
     *   - domain.com
     *
     * Query arguments and more complex paths are valid
     *
     * ```
     * new FormControl('', [NguardValidators.String.url]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const url = (c: AbstractControl): ValidationErrors | null =>
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(
            c.value
        )
            ? null
            : { url: true };

    /**
     * The field under validation must be exactly equal to the given string (strict equality).
     *
     * ```
     * new FormControl('', [NguardValidators.String.equalTo('expected')]),
     * ```
     *
     * @param {string} value The value the field must equal
     * @returns {ValidatorFn}
     */
    export const equalTo = (value: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => (c.value === value ? null : { equalTo: true });
    };

    /**
     * The field under validation must be one of the given TypeScript enum's values.
     * Reverse-mapping keys of numeric enums are ignored, so both string and numeric enums work.
     *
     * ```
     * new FormControl('', [NguardValidators.String.inEnum(Status)]),
     * ```
     *
     * @param {Record<string, string | number>} enumObject The enum to check membership against
     * @returns {ValidatorFn}
     */
    export const inEnum = (enumObject: Record<string, string | number>): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const values = Object.keys(enumObject)
                .filter(key => isNaN(Number(key)))
                .map(key => enumObject[key]);

            return values.includes(c.value) ? null : { inEnum: true };
        };
    };

    /**
     * The field under validation must be one of the given values (strict membership via Array.includes).
     *
     * ```
     * new FormControl('', [NguardValidators.String.inList('draft', 'published')]),
     * ```
     *
     * @param {...string} values The allowed values
     * @returns {ValidatorFn}
     */
    export const inList = (...values: string[]): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => (values.includes(c.value) ? null : { inList: true });
    };

    /**
     * The field under validation must NOT be exactly equal to the given string (strict equality).
     *
     * ```
     * new FormControl('', [NguardValidators.String.notEqualTo('forbidden')]),
     * ```
     *
     * @param {string} value The value the field must not equal
     * @returns {ValidatorFn}
     */
    export const notEqualTo = (value: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => (c.value !== value ? null : { notEqualTo: true });
    };

    /**
     * The field under validation must NOT be one of the given values.
     *
     * ```
     * new FormControl('', [NguardValidators.String.notInList('admin', 'root')]),
     * ```
     *
     * @param {...string} values The disallowed values
     * @returns {ValidatorFn}
     */
    export const notInList = (...values: string[]): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null =>
            !values.includes(c.value) ? null : { notInList: true };
    };

    /**
     * The field under validation must be a valid BIC / SWIFT code (8 or 11 characters).
     *
     * ```
     * new FormControl('', [NguardValidators.String.bic]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const bic = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || c.value.length === 0) {
            return { bic: true };
        }
        return /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(c.value) ? null : { bic: true };
    };

    /**
     * The field under validation must be a valid credit card number — 13 to 19 digits
     * (spaces and dashes allowed) passing the Luhn checksum.
     *
     * ```
     * new FormControl('', [NguardValidators.String.creditCard]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const creditCard = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value)) {
            return { creditCard: true };
        }
        const digits = c.value.replace(/[ -]/g, '');
        if (!/^\d{13,19}$/.test(digits)) {
            return { creditCard: true };
        }
        return _luhnValid(digits) ? null : { creditCard: true };
    };

    /**
     * The field under validation must be a valid EAN-8 or EAN-13 barcode (check digit verified).
     *
     * ```
     * new FormControl('', [NguardValidators.String.ean]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const ean = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value) || !/^(\d{8}|\d{13})$/.test(c.value)) {
            return { ean: true };
        }
        const len = c.value.length;
        let sum = 0;
        for (let i = 0; i < len - 1; i++) {
            const d = c.value.charCodeAt(i) - 48;
            // Weight 3 on the rightmost data digit, then alternate 1, 3, 1 ... (works for EAN-8 and EAN-13).
            sum += (len - 1 - i) % 2 === 1 ? d * 3 : d;
        }
        const check = (10 - (sum % 10)) % 10;
        return check === c.value.charCodeAt(len - 1) - 48 ? null : { ean: true };
    };

    /**
     * The field under validation must be a valid IBAN: country prefix, expected length
     * (for known countries) and the ISO 7064 mod-97 checksum. Spaces are ignored.
     *
     * ```
     * new FormControl('', [NguardValidators.String.iban]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const iban = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value)) {
            return { iban: true };
        }
        const v = c.value.replace(/\s/g, '').toUpperCase();
        if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(v)) {
            return { iban: true };
        }
        const expectedLength = _IBAN_LENGTHS[v.slice(0, 2)];
        if (expectedLength !== undefined && v.length !== expectedLength) {
            return { iban: true };
        }
        return _ibanMod97(v) === 1 ? null : { iban: true };
    };

    /**
     * The field under validation must be a valid ISBN-10 or ISBN-13 (check digit verified).
     * Spaces and dashes are ignored.
     *
     * ```
     * new FormControl('', [NguardValidators.String.isbn]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const isbn = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value)) {
            return { isbn: true };
        }
        const v = c.value.replace(/[ -]/g, '').toUpperCase();
        if (/^\d{9}[\dX]$/.test(v)) {
            let sum = 0;
            for (let i = 0; i < 9; i++) {
                sum += (10 - i) * (v.charCodeAt(i) - 48);
            }
            sum += v[9] === 'X' ? 10 : v.charCodeAt(9) - 48;
            return sum % 11 === 0 ? null : { isbn: true };
        }
        if (/^\d{13}$/.test(v)) {
            let sum = 0;
            for (let i = 0; i < 12; i++) {
                const d = v.charCodeAt(i) - 48;
                sum += i % 2 === 0 ? d : d * 3;
            }
            const check = (10 - (sum % 10)) % 10;
            return check === v.charCodeAt(12) - 48 ? null : { isbn: true };
        }
        return { isbn: true };
    };

    /**
     * The field under validation must be a valid phone number, delegated to `libphonenumber-js`.
     * Without `defaultCountry` the value must be in E.164 format (e.g. `+14155552671`); with a
     * country (e.g. `'US'`) national formats are accepted.
     *
     * ```
     * new FormControl('', [NguardValidators.String.phone('US')]),
     * ```
     *
     * @param {string} [defaultCountry] ISO 3166-1 alpha-2 country code for national-format numbers
     * @returns {ValidatorFn}
     */
    export const phone = (defaultCountry?: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!isString(c.value) || c.value.length === 0) {
                return { phone: true };
            }
            try {
                const valid = defaultCountry
                    ? isValidPhoneNumber(c.value, defaultCountry as CountryCode)
                    : isValidPhoneNumber(c.value);
                return valid ? null : { phone: true };
            } catch {
                return { phone: true };
            }
        };
    };

    /**
     * The field under validation must be a valid postal code. Pass an ISO 3166-1 alpha-2
     * country code for a country-specific format; otherwise a generic alphanumeric check applies.
     *
     * ```
     * new FormControl('', [NguardValidators.String.postalCode('US')]),
     * ```
     *
     * @param {string} [country] ISO 3166-1 alpha-2 country code
     * @returns {ValidatorFn}
     */
    export const postalCode = (country?: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!isString(c.value) || c.value.length === 0) {
                return { postalCode: true };
            }
            const pattern = country ? _POSTAL_PATTERNS[country.toUpperCase()] : undefined;
            const regex = pattern ?? /^[A-Za-z0-9][A-Za-z0-9 -]{1,10}[A-Za-z0-9]$/;
            return regex.test(c.value) ? null : { postalCode: true };
        };
    };

    /**
     * The field under validation must be a valid US Social Security Number (`AAA-GG-SSSS`,
     * dashes optional), excluding the ranges the SSA never issues.
     *
     * ```
     * new FormControl('', [NguardValidators.String.ssn]),
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const ssn = (c: AbstractControl): ValidationErrors | null => {
        if (!isString(c.value)) {
            return { ssn: true };
        }
        const match = /^(\d{3})-?(\d{2})-?(\d{4})$/.exec(c.value);
        if (!match) {
            return { ssn: true };
        }
        const [, area, group, serial] = match;
        if (area === '000' || area === '666' || Number(area) >= 900) {
            return { ssn: true };
        }
        if (group === '00' || serial === '0000') {
            return { ssn: true };
        }
        return null;
    };

    /**
     * The field under validation must be a valid EU VAT number. Pass an ISO 3166-1 alpha-2
     * country code to check a specific country's format; otherwise any known EU format is accepted.
     * Spaces are ignored.
     *
     * ```
     * new FormControl('', [NguardValidators.String.vatNumber('DE')]),
     * ```
     *
     * @param {string} [country] ISO 3166-1 alpha-2 country code
     * @returns {ValidatorFn}
     */
    export const vatNumber = (country?: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!isString(c.value) || c.value.length === 0) {
                return { vatNumber: true };
            }
            const v = c.value.replace(/\s/g, '').toUpperCase();
            if (country) {
                const pattern = _VAT_PATTERNS[country.toUpperCase()];
                return pattern && pattern.test(v) ? null : { vatNumber: true };
            }
            return Object.values(_VAT_PATTERNS).some(p => p.test(v)) ? null : { vatNumber: true };
        };
    };
}
