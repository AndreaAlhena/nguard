import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const BOOLEAN_LIKE_VALUES: ReadonlySet<unknown> = new Set([true, false, 1, 0, '1', '0']);

export namespace BooleanValidators {
    /**
     * Validate that the value is boolean-like (Laravel parity).
     * Accepted inputs: `true`, `false`, `1`, `0`, `'1'`, `'0'`.
     *
     * ```
     * new FormControl(false, [NguardValidators.Boolean.boolean])
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const boolean: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        const isBooleanLike = BOOLEAN_LIKE_VALUES.has(c.value);

        return isBooleanLike ? null : { boolean: true };
    };

    /**
     * Validate that the value is falsy (i.e. `!value` is true).
     * Catches `false`, `0`, `''`, `null`, `undefined`, `NaN`.
     *
     * ```
     * new FormControl(false, [NguardValidators.Boolean.falsy])
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const falsy: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        const isFalsy = !c.value;

        return isFalsy ? null : { falsy: true };
    };

    /**
     * Validate that the value is truthy (i.e. `Boolean(value)` is true).
     * Rejects `false`, `0`, `''`, `null`, `undefined`, `NaN`.
     *
     * ```
     * new FormControl(true, [NguardValidators.Boolean.truthy])
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const truthy: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        const isTruthy = Boolean(c.value);

        return isTruthy ? null : { truthy: true };
    };
}
