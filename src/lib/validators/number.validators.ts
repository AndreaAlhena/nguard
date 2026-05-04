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
     * The field under validation must have a numeric value strictly greater than another field's numeric value.
     * Both values must be numeric; non-numeric inputs (including the sibling) cause the validator to fail.
     *
     * ```
     * floor: new FormControl(0),
     * ceiling: new FormControl(0, [NumberValidators.greaterThan('floor')]),
     * ```
     *
     * @param {string} fieldKey The key of the sibling field to compare against
     * @returns {ValidatorFn}
     */
    export const greaterThan = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const sibling = c.parent?.get(fieldKey)?.value;
            if (!isNumeric(c.value) || !isNumeric(sibling)) {
                return { greaterThan: true };
            }
            return Number(c.value) > Number(sibling) ? null : { greaterThan: true };
        };
    };

    /**
     * The field under validation must have a numeric value greater than or equal to another field's numeric value.
     *
     * ```
     * floor: new FormControl(0),
     * ceiling: new FormControl(0, [NumberValidators.greaterThanOrEqual('floor')]),
     * ```
     *
     * @param {string} fieldKey The key of the sibling field to compare against
     * @returns {ValidatorFn}
     */
    export const greaterThanOrEqual = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const sibling = c.parent?.get(fieldKey)?.value;
            if (!isNumeric(c.value) || !isNumeric(sibling)) {
                return { greaterThanOrEqual: true };
            }
            return Number(c.value) >= Number(sibling) ? null : { greaterThanOrEqual: true };
        };
    };

    /**
     * The field under validation must have a numeric value strictly lesser than another field's numeric value.
     *
     * ```
     * ceiling: new FormControl(0),
     * floor: new FormControl(0, [NumberValidators.lesserThan('ceiling')]),
     * ```
     *
     * @param {string} fieldKey The key of the sibling field to compare against
     * @returns {ValidatorFn}
     */
    export const lesserThan = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const sibling = c.parent?.get(fieldKey)?.value;
            if (!isNumeric(c.value) || !isNumeric(sibling)) {
                return { lesserThan: true };
            }
            return Number(c.value) < Number(sibling) ? null : { lesserThan: true };
        };
    };

    /**
     * The field under validation must have a numeric value lesser than or equal to another field's numeric value.
     *
     * ```
     * ceiling: new FormControl(0),
     * floor: new FormControl(0, [NumberValidators.lesserThanOrEqual('ceiling')]),
     * ```
     *
     * @param {string} fieldKey The key of the sibling field to compare against
     * @returns {ValidatorFn}
     */
    export const lesserThanOrEqual = (fieldKey: string): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const sibling = c.parent?.get(fieldKey)?.value;
            if (!isNumeric(c.value) || !isNumeric(sibling)) {
                return { lesserThanOrEqual: true };
            }
            return Number(c.value) <= Number(sibling) ? null : { lesserThanOrEqual: true };
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
            if (!isNumeric(c.value)) {
                return { range: true };
            }
            const value = Number(c.value);
            return value >= minVal && value <= maxVal ? null : { range: true };
        };
    };
}
