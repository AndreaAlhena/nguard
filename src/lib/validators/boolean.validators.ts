import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const ACCEPTED_VALUES: ReadonlySet<unknown> = new Set([true, 'true', 1, '1', 'yes', 'on']);
const BOOLEAN_LIKE_VALUES: ReadonlySet<unknown> = new Set([true, false, 1, 0, '1', '0']);
const DECLINED_VALUES: ReadonlySet<unknown> = new Set([false, 'false', 0, '0', 'no', 'off']);

export namespace BooleanValidators {
    /**
     * Validate that the value is one of the accepted values (Laravel parity).
     * Accepted inputs: `true`, `'true'`, `1`, `'1'`, `'yes'`, `'on'`.
     *
     * ```
     * new FormControl(true, [NguardValidators.Boolean.accepted])
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const accepted: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        const isAccepted = ACCEPTED_VALUES.has(c.value);

        return isAccepted ? null : { accepted: true };
    };

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
     * Validate that the value is one of the declined values (Laravel parity).
     * Accepted inputs: `false`, `'false'`, `0`, `'0'`, `'no'`, `'off'`.
     *
     * ```
     * new FormControl(false, [NguardValidators.Boolean.declined])
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const declined: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        const isDeclined = DECLINED_VALUES.has(c.value);

        return isDeclined ? null : { declined: true };
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
