import { AbstractControl } from "@angular/forms";

export namespace StringValidators {
    /**
     * Validate an attribute that contains only Unicode alphabetic characters (matched by \p{L} and \p{M})
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

            if (!hasAsciiOnly) console.log(regEx.test(c.value));

            return regEx.test(c.value)
                ? null
                : { alpha: true };
        };
    };
}