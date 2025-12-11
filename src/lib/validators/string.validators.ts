import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const isString = (value: any) => typeof value === 'string';

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
     * @return {ValidationFn}
     */
    export const alpha = (hasAsciiOnly: boolean = false) => {
        return (c: AbstractControl) => {
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
     * @return {ValidationFn}
     */
    export const alphaDash = (hasAsciiOnly: boolean = false) => {
        return (c: AbstractControl) => {
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
     * @return {ValidationFn}
     */
    export const alphaNum = (hasAsciiOnly: boolean = false) => {
        return (c: AbstractControl) => {
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
    // eslint-disable-next-line no-control-regex
    export const ascii = (c: AbstractControl) => (/^[\x09\x0A\x0D\x20-\x7E]+$/.test(c.value) ? null : { ascii: true });

    /**
     * The field under validation must be lowercase
     *
     * ```
     * new FormControl('', [NguardValidators.String.lowercase]),
     * ```
     * @return {ValidationErrors | null}
     */
    export const lowercase = (c: AbstractControl): ValidationErrors | null =>
        isString(c.value) && c.value.toLowerCase() === c.value ? null : { lowercase: true };

    /**
     * The field under validation must be uppercase
     *
     * ```
     * new FormControl('', [NguardValidators.String.uppercase]),
     * ```
     * @return {ValidationErrors | null}
     */
    export const uppercase = (c: AbstractControl<string>): ValidationErrors | null =>
        isString(c.value) && c.value.toUpperCase() === c.value ? null : { uppercase: true };

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
}
