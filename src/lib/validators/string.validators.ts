import { AbstractControl } from "@angular/forms";

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
                : /^[\p{L}\p{M}N_-]+$/u;

            return regEx.test(c.value)
                ? null
                : { alphaDash: true };
        };
    };
}