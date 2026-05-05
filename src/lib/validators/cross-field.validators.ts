import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { equalityCheck, evaluateCondition, primitive } from '../utils/validators.utils';

/**
 * Returns true if the sibling identified by `fieldKey` resolves to a truthy value.
 * Returns false when the sibling is missing, the parent form group is absent or the value is falsy.
 * Used by the variadic required-with / required-without family to inspect each listed sibling.
 */
const _isFilledSibling = (control: AbstractControl, fieldKey: string): boolean =>
    Boolean(control.parent?.get(fieldKey)?.value);

/**
 * Returns true if the control's value is set (anything other than null or undefined).
 * Empty string, zero and false count as present — only null and undefined count as missing.
 * Used by the present-if / present-unless family.
 */
const _isPresent = (control: AbstractControl): boolean => control.value !== null && control.value !== undefined;

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
     * The field's value must be present (not null and not undefined) when another sibling
     * field matches the trigger condition. Unlike `requiredIf` an empty string, zero or
     * `false` count as present — only `null` / `undefined` fail the rule.
     *
     * ```
     * new FormControl(null, [
     *   NguardValidators.CrossField.presentIf('hasNotes', true)
     * ])
     * ```
     *
     * @param {string} fieldKey The key of the sibling field whose value triggers the requirement
     * @param {primitive} [value] If present, the sibling must equal this value to trigger the rule
     * @param {boolean} [isStrict] If true, the equality check against `value` is performed with the strict equality operator
     * @returns {ValidatorFn}
     */
    export const presentIf = (fieldKey: string, value?: primitive, isStrict: boolean = false): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!evaluateCondition(c, fieldKey, value, isStrict)) {
                return null;
            }

            return _isPresent(c) ? null : { presentIf: true };
        };
    };

    /**
     * The field's value must be present (not null and not undefined) UNLESS another sibling
     * field matches the trigger condition. Unlike `requiredUnless` an empty string, zero or
     * `false` count as present — only `null` / `undefined` fail the rule.
     *
     * ```
     * new FormControl(null, [
     *   NguardValidators.CrossField.presentUnless('hasNotes', false)
     * ])
     * ```
     *
     * @param {string} fieldKey The key of the sibling field whose value bypasses the rule
     * @param {primitive} [value] If present, the sibling must equal this value to bypass; otherwise any truthy sibling value bypasses
     * @param {boolean} [isStrict] If true, the equality check against `value` is performed with the strict equality operator
     * @returns {ValidatorFn}
     */
    export const presentUnless = (fieldKey: string, value?: primitive, isStrict: boolean = false): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (evaluateCondition(c, fieldKey, value, isStrict)) {
                return null;
            }

            return _isPresent(c) ? null : { presentUnless: true };
        };
    };

    /**
     * The field's value must be empty (falsy) when another sibling field matches the
     * trigger condition. When the condition is not met any value is accepted.
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.CrossField.prohibitedIf('isAnonymous', true)
     * ])
     * ```
     *
     * @param {string} fieldKey The key of the sibling field whose value triggers the prohibition
     * @param {primitive} [value] If present, the sibling must equal this value to trigger the rule
     * @param {boolean} [isStrict] If true, the equality check against `value` is performed with the strict equality operator
     * @returns {ValidatorFn}
     */
    export const prohibitedIf = (fieldKey: string, value?: primitive, isStrict: boolean = false): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!evaluateCondition(c, fieldKey, value, isStrict)) {
                return null;
            }

            return c.value ? { prohibitedIf: true } : null;
        };
    };

    /**
     * The field's value must be empty (falsy) UNLESS another sibling field matches the
     * trigger condition. When the condition is met any value is accepted.
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.CrossField.prohibitedUnless('role', 'admin')
     * ])
     * ```
     *
     * @param {string} fieldKey The key of the sibling field whose value bypasses the prohibition
     * @param {primitive} [value] If present, the sibling must equal this value to bypass; otherwise any truthy sibling value bypasses
     * @param {boolean} [isStrict] If true, the equality check against `value` is performed with the strict equality operator
     * @returns {ValidatorFn}
     */
    export const prohibitedUnless = (fieldKey: string, value?: primitive, isStrict: boolean = false): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (evaluateCondition(c, fieldKey, value, isStrict)) {
                return null;
            }

            return c.value ? { prohibitedUnless: true } : null;
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
     * The field is required UNLESS another sibling field matches the trigger condition.
     * When the condition is met (sibling matches `value`, or sibling is truthy when `value`
     * is omitted) the rule is bypassed and any value — including empty — passes.
     * When the condition is not met the field's value must be truthy.
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.CrossField.requiredUnless('country', 'US')
     * ])
     * ```
     *
     * @param {string} fieldKey The key of the sibling field whose value bypasses the requirement
     * @param {primitive} [value] If present, the sibling must equal this value to bypass; otherwise any truthy sibling value bypasses
     * @param {boolean} [isStrict] If true, the equality check against `value` is performed with the strict equality operator
     * @returns {ValidatorFn}
     */
    export const requiredUnless = (fieldKey: string, value?: primitive, isStrict: boolean = false): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (evaluateCondition(c, fieldKey, value, isStrict)) {
                return null;
            }

            return c.value ? null : { requiredUnless: true };
        };
    };

    /**
     * The field is required when ANY of the listed sibling fields is filled (truthy).
     * If none of the listed siblings are filled the rule is bypassed.
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.CrossField.requiredWith('phone', 'address')
     * ])
     * ```
     *
     * @param {...string} fieldKeys One or more keys of sibling fields that, when any is filled, force this field to be required
     * @returns {ValidatorFn}
     */
    export const requiredWith = (...fieldKeys: string[]): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const anyFilled = fieldKeys.some(key => _isFilledSibling(c, key));

            if (!anyFilled) {
                return null;
            }

            return c.value ? null : { requiredWith: true };
        };
    };

    /**
     * The field is required when EVERY listed sibling field is filled (truthy).
     * If any of the listed siblings is empty the rule is bypassed.
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.CrossField.requiredWithAll('firstName', 'lastName')
     * ])
     * ```
     *
     * @param {...string} fieldKeys One or more keys of sibling fields. The rule applies only when all of them are filled
     * @returns {ValidatorFn}
     */
    export const requiredWithAll = (...fieldKeys: string[]): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const allFilled = fieldKeys.every(key => _isFilledSibling(c, key));

            if (!allFilled) {
                return null;
            }

            return c.value ? null : { requiredWithAll: true };
        };
    };

    /**
     * The field is required when ANY of the listed sibling fields is NOT filled.
     * If every listed sibling is filled the rule is bypassed.
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.CrossField.requiredWithout('email', 'phone')
     * ])
     * ```
     *
     * @param {...string} fieldKeys One or more keys of sibling fields whose absence forces this field to be required
     * @returns {ValidatorFn}
     */
    export const requiredWithout = (...fieldKeys: string[]): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const anyMissing = fieldKeys.some(key => !_isFilledSibling(c, key));

            if (!anyMissing) {
                return null;
            }

            return c.value ? null : { requiredWithout: true };
        };
    };

    /**
     * The field is required when EVERY listed sibling field is missing (falsy).
     * If any of the listed siblings is filled the rule is bypassed.
     *
     * ```
     * new FormControl('', [
     *   NguardValidators.CrossField.requiredWithoutAll('email', 'phone')
     * ])
     * ```
     *
     * @param {...string} fieldKeys One or more keys of sibling fields. The rule applies only when all of them are empty
     * @returns {ValidatorFn}
     */
    export const requiredWithoutAll = (...fieldKeys: string[]): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const allMissing = fieldKeys.every(key => !_isFilledSibling(c, key));

            if (!allMissing) {
                return null;
            }

            return c.value ? null : { requiredWithoutAll: true };
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
