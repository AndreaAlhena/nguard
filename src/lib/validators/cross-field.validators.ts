import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { equalityCheck, primitive } from '../utils/validators.utils';

export namespace CrossFieldValidators {
    /**
     * The field under validation must match a field named `{field}_confirmation`.
     * For example, if the field is `password`, a matching `password_confirmation` field must be present.
     *
     * ```
     * password: new FormControl(''),
     * password_confirmation: new FormControl('', [NguardValidators.CrossField.confirmed('password')])
     * ```
     *
     * @param {string} fieldKey The key of the original field to confirm
     * @returns {ValidatorFn}
     */
    export const confirmed = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const originalValue = c.parent?.get(fieldKey)?.value;
            return equalityCheck(c.value, originalValue, true) ? null : { confirmed: true };
        };
    };

    /**
     * Validate that an attribute is different to another one with the specified fieldKey
     * The performed check is case sensitive for strings
     *
     * ```
     * password: new FormControl(''),
     * passwordConfirm: new FormControl('', [NguardValidators.CrossField.different('password')])
     * ```
     * @return {ValidatorFn}
     */
    export const different = (fieldKey: string, isStrict: boolean = false): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (equalityCheck(c.value, c.parent?.get(fieldKey)?.value, isStrict)) {
                return {
                    different: true,
                };
            }

            return null;
        };
    };

    /**
     * The field is required if another field, for the given fieldKey, is set.
     * If a value is provided, the other field must match that value
     * (the equality check is non strict until true is passed to the isStrict param)
     *
     * The field is considered filled if the provided value is true while casted to boolean
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.CrossField.requiredIf('anotherField', 'another field value', true)
     * ])
     * ```
     *
     * @param {string} fieldKey The key of the field to check in the current field group
     * @param {primitive} [value] If present, the field that belongs to the given fieldKey must match the specified value
     * @param {boolean} [isStrict] If true, the equality check is performed with a strict equality operator
     * @returns {ValidatorFn}
     */
    export const requiredIf = (fieldKey: string, value?: primitive, isStrict: boolean = false) => {
        return (c: AbstractControl): ValidationErrors | null => {
            const check =
                c.value && value
                    ? c.value && equalityCheck(c.parent?.get(fieldKey)?.value, value, isStrict)
                    : c.value && c.parent?.get(fieldKey)?.value;

            return check ? null : { requiredIf: true };
        };
    };

    /**
     * Validate that an attribute is equal to another one with the specified fieldKey
     * The performed check is case sensitive
     *
     * ```
     * password: new FormControl(''),
     * passwordConfirm: new FormControl('', [NguardValidators.CrossField.same('password')])
     * ```
     * @return {ValidatorFn}
     */
    export const same = (fieldKey: string, isStrict: boolean = false): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (equalityCheck(c.value, c.parent?.get(fieldKey)?.value, isStrict)) {
                return null;
            }

            return {
                same: true,
            };
        };
    };
}
