import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { equalityCheck, haveSameType, primitive } from "../utils/validators.utils";

export namespace MultiValidators {
    /**
     * Validate that an attribute is different to another one with the specified compareFieldKey
     * The performed check is case sensitive for strings
     * 
     * ```
     * password: new FormControl(''),
     * passwordConfirm: new FormControl('', [NguardValidators.Multi.different('password')])
     * ```
     * @return {ValidationFn}
     */
    export const different = (compareFieldKey: string, isStrict: boolean = false): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (equalityCheck(c.value, c.parent?.get(compareFieldKey)?.value, isStrict)) {
                return {
                    different: true
                };
            }

            return null;
        }
    }   

    /**
     * Validate that an attribute doesn't end with one of the given values.
     * The performed check is case insensitive
     * 
     * ```
     * new FormControl('', [
     *   NguardValidators.Multi.doesntEndWith('first', 'second', 'third')
     * ])
     * ```
     * @return {ValidationFn}
     */
    export const doesntEndWith = (...values: primitive[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (`${control.value}`.toLowerCase().endsWith(`${value}`.toLowerCase())) {
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
     *   NguardValidators.Multi.doesntStartWith('first', 'second', 'third')
     * ])
     * ```
     * @return {ValidationFn}
     */
    export const doesntStartWith = (...values: primitive[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (`${control.value}`.toLowerCase().startsWith(`${value}`.toLowerCase())) {
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
    *   NguardValidators.Multi.endsWith('first', 'second', 'third')
    * ])
    * ```
    * 
    * @param {primitive[]} values A mixed array of primitive values (strings, numbers and boolean)
    * @return {ValidationFn}
    */
    export const endsWith = (...values: primitive[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (`${control.value}`.toLowerCase().endsWith(`${value}`.toLowerCase())) {
                    return null;
                }
            }

            return {
                endsWith: true
            };
        }
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
     *   NguardValidators.Multi.greaterThan('fieldToCompare')
     * ])
     * ```
     * 
     * @param {string} compareFieldKey 
     * @returns {ValidatorFn}
     */
    export const greaterThan = (compareFieldKey: string): ValidatorFn => {
        return (c: AbstractControl) => {
            const [value1, value2] = [c.value, c.parent?.get(compareFieldKey)?.value];

            if (!haveSameType(value1, value2)) {
                return { greaterThan: true };
            };

            return typeof value1 === 'string' && value1.length > value2.length || typeof value1 === 'number' && value1 > value2
                ? null
                : { greaterThan: true };
        }
    }

    /**
     * The field under validation must be greater than or equal the given field name.
     * Both fields must be of the same type. In case of a type mismatch, the validator
     * will return a validation error
     * 
     * Strings are evaluated accordingly to their length
     * Numerics are evaluated accordingly to their value
     * 
     * new FormControl('', [
     *   NguardValidators.Multi.greaterThan('fieldToCompare')
     * ])
     * ```
     * 
     * @param {string} compareFieldKey 
     * @returns {ValidatorFn}
     */
    export const greaterThanOrEqual = (compareFieldKey: string): ValidatorFn => {
        return (c: AbstractControl) => {
            const [value1, value2] = [c.value, c.parent?.get(compareFieldKey)?.value];

            if (!haveSameType(value1, value2)) {
                return { greaterThanOrEqual: true };
            };

            return typeof value1 === 'string' && value1.length >= value2.length || typeof value1 === 'number' && value1 >= value2
                ? null
                : { greaterThanOrEqual: true };
        }
    }

    /**
     * The field under validation must be lesser than the given field name.
     * Both fields must be of the same type. In case of a type mismatch, the validator
     * will return a validation error
     * 
     * Strings are evaluated accordingly to their length
     * Numerics are evaluated accordingly to their value
     * 
     * new FormControl('', [
     *   NguardValidators.Multi.lesserThan('fieldToCompare')
     * ])
     * ```
     * 
     * @param {string} compareFieldKey 
     * @returns {ValidatorFn}
     */
    export const lesserThan = (compareFieldKey: string): ValidatorFn => {
        return (c: AbstractControl) => {
            const [value1, value2] = [c.value, c.parent?.get(compareFieldKey)?.value];

            if (!haveSameType(value1, value2)) {
                return { lesserThan: true };
            };

            return typeof value1 === 'string' && value1.length < value2.length || typeof value1 === 'number' && value1 < value2
                ? null
                : { lesserThan: true };
        }
    }

    /**
     * The field under validation must be lesser than the given field name.
     * Both fields must be of the same type. In case of a type mismatch, the validator
     * will return a validation error
     * 
     * Strings are evaluated accordingly to their length
     * Numerics are evaluated accordingly to their value
     * 
     * new FormControl('', [
     *   NguardValidators.Multi.lesserThanOrEqual('fieldToCompare')
     * ])
     * ```
     * 
     * @param {string} compareFieldKey 
     * @returns {ValidatorFn}
     */
    export const lesserThanOrEqual = (compareFieldKey: string): ValidatorFn => {
        return (c: AbstractControl) => {
            const [value1, value2] = [c.value, c.parent?.get(compareFieldKey)?.value];

            if (!haveSameType(value1, value2)) {
                return { lesserThanOrEqual: true };
            };

            return typeof value1 === 'string' && value1.length <= value2.length || typeof value1 === 'number' && value1 <= value2
                ? null
                : { lesserThanOrEqual: true };
        }
    }

    /**
     * Validate that an attribute is equal to another one with the specified compareFieldKey
     * The performed check is case sensitive
     * 
     * ```
     * password: new FormControl(''),
     * passwordConfirm: new FormControl('', [NguardValidators.Multi.same('password')])
     * ```
     * @return {ValidationFn}
     */
    export const same = (compareFieldKey: string, isStrict: boolean = false): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (equalityCheck(c.value, c.parent?.get(compareFieldKey)?.value, isStrict)) {
                return null;
            }

            return {
                same: true
            };
        }
    }

    /**
     * Validate that an attribute starts with one of the given values.
     * The performed check is case insensitive
     * 
     * ```
     * new FormControl('', [
     *   NguardValidators.String.startsWith('first', 'second', 'third')
     * ])
     * ```
     * 
     * @param {primitive[]} values A mixed array of primitive values (strings, numbers and boolean)
     * @return {ValidationFn}
     */
    export const startsWith = (...values: primitive[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            for (const value of values) {
                if (`${control.value}`.toLowerCase().startsWith(`${value}`.toLowerCase())) {
                    return null;
                }
            }

            return {
                startsWith: true
            };
        }
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
     *   NguardValidators.String.requiredIf('anotherField', 'another field value', true)
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
            const check = c.value && value
                ? c.value && equalityCheck(c.parent?.get(fieldKey)?.value, value, isStrict)
                : c.value && c.parent?.get(fieldKey)?.value;

            return check
                ? null
                : { requiredIf: true }
        };
    };
}
