import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { equalityCheck, primitive } from '../utils/validators.utils';

/**
 * Evaluate whether the sibling identified by `fieldKey` satisfies the trigger condition.
 * If `value` is omitted the sibling must simply be truthy. If `value` is provided the
 * sibling must equal it (loose equality by default, strict when `isStrict` is true).
 *
 * Used by the conditional family — requiredUnless, presentIf, presentUnless, prohibitedIf,
 * prohibitedUnless — to decide whether the rule applies to the current control.
 */
const _evaluateCondition = (
    control: AbstractControl,
    fieldKey: string,
    value?: primitive,
    isStrict: boolean = false
): boolean => {
    const siblingValue = control.parent?.get(fieldKey)?.value;

    if (value === undefined) {
        return Boolean(siblingValue);
    }

    return equalityCheck(siblingValue, value, isStrict);
};

/**
 * Returns true if the sibling identified by `fieldKey` resolves to a truthy value.
 * Returns false when the sibling is missing, the parent form group is absent or the value is falsy.
 * Used by the variadic required-with / required-without family to inspect each listed sibling.
 */
const _isFilledSibling = (control: AbstractControl, fieldKey: string): boolean =>
    Boolean(control.parent?.get(fieldKey)?.value);

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
            if (_evaluateCondition(c, fieldKey, value, isStrict)) {
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
