import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export namespace StringValidators {
    /**
     * Validate that an attribute contains only Unicode alphabetic characters (matched by \p{L} and \p{M})
     * If the hasAsciiOnly flag is set to true, the validation is restricted by characters in the ASCII range
     * (a-z and A-Z)
     * 
     * ```
     * new FormControl('', [
     *   StringValidators.alpha() // or StringValidators.alpha(true)
     * ])
     * ```
     * @param {boolean} hasAsciiOnly If true, limits characters to ASCII chars (a-z and A-Z)
     * @return {ValidationFn}
     */
    export const alpha = (hasAsciiOnly: boolean = false) => {
        return (c: AbstractControl) => {
            const regEx: RegExp = hasAsciiOnly
                ? /^[a-zA-Z]+$/u
                : /^[\p{L}\p{M}]+$/u;

            return regEx.test(c.value)
                ? null
                : { alpha: true };
        };
    };

    /**
     * Validate that an attribute contains only Unicode alphanumeric characters (matched by \p{L} and \p{M}), dash and underscores
     * If the hasAsciiOnly flag is set to true, the validation is restricted by characters in the ASCII range
     * (a-z, A-Z and 0-9), dashes and underscores
     * 
     * ```
     * new FormControl('', [
     *   StringValidators.alphaDash() // or StringValidators.alphaDash(true)
     * ])
     * ```
     * @param {boolean} hasAsciiOnly If true, limits characters to ASCII chars (a-z and A-Z)
     * @return {ValidationFn}
     */
    export const alphaDash = (hasAsciiOnly: boolean = false) => {
        return (c: AbstractControl) => {
            const regEx: RegExp = hasAsciiOnly
                ? /^[a-zA-Z0-9_-]+$/u
                : /^[\p{L}\p{M}\p{N}_-]+$/u;

            return regEx.test(c.value)
                ? null
                : { alphaDash: true };
        };
    };

    /**
     * Validate that an attribute contains only Unicode alphanumeric characters (matched by \p{L} and \p{M})
     * If the hasAsciiOnly flag is set to true, the validation is restricted by characters in the ASCII range
     * (a-z, A-Z and 0-9)
     * 
     * ```
     * new FormControl('', [
     *   StringValidators.alphaNum() // or StringValidators.alphaNum(true)
     * ])
     * ```
     * @param {boolean} hasAsciiOnly If true, limits characters to ASCII chars (a-z and A-Z)
     * @return {ValidationFn}
     */
    export const alphaNum = (hasAsciiOnly: boolean = false) => {
        return (c: AbstractControl) => {
            const regEx: RegExp = hasAsciiOnly
                ? /^[a-zA-Z0-9]+$/u
                : /^[\p{L}\p{M}\p{N}]+$/u;

            return regEx.test(c.value)
                ? null
                : { alphaNum: true };
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
     *   StringValidators.ascii()
     * ])
     * ```
     * @return {ValidationFn}
     */
    export const ascii = () => {
        return (c: AbstractControl) => /^[\x09\x0A\x0D\x20-\x7E]+$/.test(c.value)
            ? null
            : { ascii: true };
        };
    ;

    /**
     * Validate that an attribute doesn't end with one of the given values.
     * The performed check is case insensitive
     * 
     * ```
     * new FormControl('', [
     *   StringValidators.doesntEndWith('first', 'second', 'third')
     * ])
     * ```
     * @return {ValidationFn}
     */
    export const doesntEndWith = (...values: string[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (control.value.toLowerCase().endsWith(value.toLowerCase())) {
                    return {
                        doesntEndWith: true
                    };
                }
            }

            return null
        }
    };

    /**
     * Validate that an attribute doesn't start with one of the given values.
     * The performed check is case insensitive
     * 
     * ```
     * new FormControl('', [
     *   StringValidators.doesntStartWith('first', 'second', 'third')
     * ])
     * ```
     * @return {ValidationFn}
     */
    export const doesntStartWith = (...values: string[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (control.value.toLowerCase().startsWith(value.toLowerCase())) {
                    return {
                        doesntStartWith: true
                    };
                }
            }

            return null
        }
    };

    /**
     * Validate that an attribute ends with one of the given values.
     * The performed check is case insensitive
     * 
     * ```
     * new FormControl('', [
     *   StringValidators.endsWith('first', 'second', 'third')
     * ])
     * ```
     * @return {ValidationFn}
     */
    export const endsWith = (...values: string[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (control.value.toLowerCase().endsWith(value.toLowerCase())) {
                    return null;
                }
            }

            return {
                endsWith: true
            };
        }
    };

    /**
     * The field under validation must be lowercase
     * 
     * ```
     * new FormControl('', [StringValidators.lowercase()]),
     * ```
     * @return {ValidationFn}
     */
    export const lowercase = (): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => c.value.toLowerCase() === c.value
            ? null
            : {lowercase: true};
    };

    /**
     * Validate that an attribute is equal to another one with the specified compareFieldKey
     * The performed check is case sensitive
     * 
     * ```
     * password: new FormControl(''),
     * passwordConfirm: new FormControl('', [StringValidators.same('password')])
     * ```
     * @return {ValidationFn}
     */
    export const same = (compareFieldKey: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (c.value !== c.parent?.get(compareFieldKey)?.value) {
                return {
                    same: true
                };
            }

            return null;
        }
    }
    
    /**
     * Validate that an attribute starts with one of the given values.
     * The performed check is case insensitive
     * 
     * ```
     * new FormControl('', [
     *   StringValidators.startsWith('first', 'second', 'third')
     * ])
     * ```
     * @return {ValidationFn}
     */
    export const startsWith = (...values: string[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (control.value.toLowerCase().startsWith(value.toLowerCase())) {
                    return null;
                }
            }

            return {
                startsWith: true
            };
        }
    };
}