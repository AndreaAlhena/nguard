import { AbstractControl } from "@angular/forms";
import XRegExp from "xregexp";

export namespace StringValidators {
    /**
     * Validate an attribute that contains only alphabetic characters.
     *
     * @param {boolean} hasAsciiOnly If true, limits characters to ASCII chars
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