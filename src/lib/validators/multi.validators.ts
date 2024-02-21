import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { equalityCheck, primitive } from "../utils/validators.utils";

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
     *   NguardValidators.String.doesntEndWith('first', 'second', 'third')
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
     *   NguardValidators.String.doesntStartWith('first', 'second', 'third')
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
     *   NguardValidators.String.endsWith('first', 'second', 'third')
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
     * Validate that an attribute is equal to another one with the specified compareFieldKey
     * The performed check is case sensitive
     * 
     * ```
     * password: new FormControl(''),
     * passwordConfirm: new FormControl('', [NguardValidators.String.same('password')])
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
                : {requiredIf: true}
        };
    };
}