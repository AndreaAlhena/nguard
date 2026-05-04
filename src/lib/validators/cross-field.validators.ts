import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { equalityCheck, haveSameType, primitive } from '../utils/validators.utils';

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
     * The field under validation must be greater than the given field name.
     * Both fields must be of the same type. In case of a type mismatch, the validator
     * will return a validation error
     *
     * Strings are evaluated accordingly to their length
     * Numerics are evaluated accordingly to their value
     *
     * new FormControl('', [
     *   NguardValidators.CrossField.greaterThan('fieldToCompare')
     * ])
     * ```
     *
     * @param {string} fieldKey
     * @returns {ValidatorFn}
     */
    export const greaterThan = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl) => {
            const [value1, value2] = [c.value, c.parent?.get(fieldKey)?.value];

            if (!haveSameType(value1, value2)) {
                return { greaterThan: true };
            }

            return (typeof value1 === 'string' && value1.length > value2.length) ||
                (typeof value1 === 'number' && value1 > value2)
                ? null
                : { greaterThan: true };
        };
    };

    /**
     * The field under validation must be greater than or equal the given field name.
     * Both fields must be of the same type. In case of a type mismatch, the validator
     * will return a validation error
     *
     * Strings are evaluated accordingly to their length
     * Numerics are evaluated accordingly to their value
     *
     * new FormControl('', [
     *   NguardValidators.CrossField.greaterThanOrEqual('fieldToCompare')
     * ])
     * ```
     *
     * @param {string} fieldKey
     * @returns {ValidatorFn}
     */
    export const greaterThanOrEqual = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl) => {
            const [value1, value2] = [c.value, c.parent?.get(fieldKey)?.value];

            if (!haveSameType(value1, value2)) {
                return { greaterThanOrEqual: true };
            }

            return (typeof value1 === 'string' && value1.length >= value2.length) ||
                (typeof value1 === 'number' && value1 >= value2)
                ? null
                : { greaterThanOrEqual: true };
        };
    };

    /**
     * The field under validation must be lesser than the given field name.
     * Both fields must be of the same type. In case of a type mismatch, the validator
     * will return a validation error
     *
     * Strings are evaluated accordingly to their length
     * Numerics are evaluated accordingly to their value
     *
     * new FormControl('', [
     *   NguardValidators.CrossField.lesserThan('fieldToCompare')
     * ])
     * ```
     *
     * @param {string} fieldKey
     * @returns {ValidatorFn}
     */
    export const lesserThan = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl) => {
            const [value1, value2] = [c.value, c.parent?.get(fieldKey)?.value];

            if (!haveSameType(value1, value2)) {
                return { lesserThan: true };
            }

            return (typeof value1 === 'string' && value1.length < value2.length) ||
                (typeof value1 === 'number' && value1 < value2)
                ? null
                : { lesserThan: true };
        };
    };

    /**
     * The field under validation must be lesser than or equal the given field name.
     * Both fields must be of the same type. In case of a type mismatch, the validator
     * will return a validation error
     *
     * Strings are evaluated accordingly to their length
     * Numerics are evaluated accordingly to their value
     *
     * new FormControl('', [
     *   NguardValidators.CrossField.lesserThanOrEqual('fieldToCompare')
     * ])
     * ```
     *
     * @param {string} fieldKey
     * @returns {ValidatorFn}
     */
    export const lesserThanOrEqual = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl) => {
            const [value1, value2] = [c.value, c.parent?.get(fieldKey)?.value];

            if (!haveSameType(value1, value2)) {
                return { lesserThanOrEqual: true };
            }

            return (typeof value1 === 'string' && value1.length <= value2.length) ||
                (typeof value1 === 'number' && value1 <= value2)
                ? null
                : { lesserThanOrEqual: true };
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

    // ============================================================================
    // Aliases
    // ============================================================================

    /**
     * Alias for greaterThan - The field under validation must be greater than the given field
     * @see greaterThan
     */
    export const gt = greaterThan;

    /**
     * Alias for greaterThanOrEqual - The field under validation must be greater than or equal to the given field
     * @see greaterThanOrEqual
     */
    export const gte = greaterThanOrEqual;

    /**
     * Alias for lesserThan - The field under validation must be less than the given field
     * @see lesserThan
     */
    export const lt = lesserThan;

    /**
     * Alias for lesserThanOrEqual - The field under validation must be less than or equal to the given field
     * @see lesserThanOrEqual
     */
    export const lte = lesserThanOrEqual;
}
