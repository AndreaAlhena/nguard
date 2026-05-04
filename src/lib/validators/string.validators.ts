import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
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
}
