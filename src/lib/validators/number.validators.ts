import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RangeValidatorErrors } from '../errors/range-validator.errors';

const isNumeric = (value: unknown): boolean => {
    if (value === null || value === undefined || value === '') {
        return false;
    }
    const num = Number(value);
    return !isNaN(num) && isFinite(num);
};

export namespace NumberValidators {
    /**
     * Validate that an attribute is in the given range of numbers (min & max values)
     *
     * ```
     * age: new FormControl('', [NumberValidators.range(10, 20)]),
     * ```
     * @return {ValidatorFn}
     */
    export const range = (minVal: number, maxVal: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (minVal > maxVal) {
                throw new RangeValidatorErrors.MinGreaterThanMax();
            }

            const value = +c.value;

            if (isNaN(value) || value < minVal || value > maxVal) {
                return {
                    range: true,
                };
            }

            return null;
        };
    };

    /**
     * The field under validation must be an integer (whole number)
     *
     * ```
     * age: new FormControl('', [NumberValidators.integer]),
     * ```
     * @returns {ValidationErrors | null}
     */
    export const integer = (c: AbstractControl): ValidationErrors | null => {
        if (!isNumeric(c.value)) {
            return { integer: true };
        }
        const num = Number(c.value);
        return Number.isInteger(num) ? null : { integer: true };
    };

    /**
     * The field under validation must be numeric (integer or floating point)
     *
     * ```
     * price: new FormControl('', [NumberValidators.numeric]),
     * ```
     * @returns {ValidationErrors | null}
     */
    export const numeric = (c: AbstractControl): ValidationErrors | null => {
        return isNumeric(c.value) ? null : { numeric: true };
    };

    /**
     * The field under validation must be greater than or equal to the given minimum value
     *
     * ```
     * age: new FormControl('', [NumberValidators.min(18)]),
     * ```
     * @param {number} minVal The minimum allowed value
     * @returns {ValidatorFn}
     */
    export const min = (minVal: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!isNumeric(c.value)) {
                return { min: true };
            }
            const num = Number(c.value);
            return num >= minVal ? null : { min: true };
        };
    };

    /**
     * The field under validation must be less than or equal to the given maximum value
     *
     * ```
     * quantity: new FormControl('', [NumberValidators.max(100)]),
     * ```
     * @param {number} maxVal The maximum allowed value
     * @returns {ValidatorFn}
     */
    export const max = (maxVal: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!isNumeric(c.value)) {
                return { max: true };
            }
            const num = Number(c.value);
            return num <= maxVal ? null : { max: true };
        };
    };

    /**
     * The field under validation must be between the given minimum and maximum values (inclusive)
     *
     * ```
     * rating: new FormControl('', [NumberValidators.between(1, 5)]),
     * ```
     * @param {number} minVal The minimum allowed value
     * @param {number} maxVal The maximum allowed value
     * @returns {ValidatorFn}
     */
    export const between = (minVal: number, maxVal: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (minVal > maxVal) {
                throw new RangeValidatorErrors.MinGreaterThanMax();
            }
            if (!isNumeric(c.value)) {
                return { between: true };
            }
            const num = Number(c.value);
            return num >= minVal && num <= maxVal ? null : { between: true };
        };
    };

    /**
     * The field under validation must be a positive number (greater than 0)
     *
     * ```
     * amount: new FormControl('', [NumberValidators.positive]),
     * ```
     * @returns {ValidationErrors | null}
     */
    export const positive = (c: AbstractControl): ValidationErrors | null => {
        if (!isNumeric(c.value)) {
            return { positive: true };
        }
        const num = Number(c.value);
        return num > 0 ? null : { positive: true };
    };

    /**
     * The field under validation must be a negative number (less than 0)
     *
     * ```
     * temperature: new FormControl('', [NumberValidators.negative]),
     * ```
     * @returns {ValidationErrors | null}
     */
    export const negative = (c: AbstractControl): ValidationErrors | null => {
        if (!isNumeric(c.value)) {
            return { negative: true };
        }
        const num = Number(c.value);
        return num < 0 ? null : { negative: true };
    };
}
