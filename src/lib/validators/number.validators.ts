import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RangeValidatorErrors } from '../errors/range-validator.errors';

const isNumeric = (value: unknown): boolean => {
    if (value === null || value === undefined || value === '') {
        return false;
    }
    const num = Number(value);
    return !isNaN(num) && isFinite(num);
};

const _compare = (value: unknown, target: unknown, op: '>' | '>=' | '<' | '<='): boolean => {
    if (!isNumeric(value) || !isNumeric(target)) {
        return false;
    }
    const a = Number(value);
    const b = Number(target);
    switch (op) {
        case '>':
            return a > b;
        case '>=':
            return a >= b;
        case '<':
            return a < b;
        case '<=':
            return a <= b;
    }
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
        return (c: AbstractControl): ValidationErrors | null =>
            _compare(c.value, c.parent?.get(fieldKey)?.value, '>') ? null : { greaterThan: true };
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
        return (c: AbstractControl): ValidationErrors | null =>
            _compare(c.value, c.parent?.get(fieldKey)?.value, '>=') ? null : { greaterThanOrEqual: true };
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
        return (c: AbstractControl): ValidationErrors | null =>
            _compare(c.value, c.parent?.get(fieldKey)?.value, '<') ? null : { lesserThan: true };
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
        return (c: AbstractControl): ValidationErrors | null =>
            _compare(c.value, c.parent?.get(fieldKey)?.value, '<=') ? null : { lesserThanOrEqual: true };
    };

    /**
     * The field under validation must be between the given minimum and maximum values (inclusive).
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
            return _compare(c.value, minVal, '>=') && _compare(c.value, maxVal, '<=') ? null : { between: true };
        };
    };

    /**
     * The field under validation must be an integer (whole number).
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
        return Number.isInteger(Number(c.value)) ? null : { integer: true };
    };

    /**
     * The field under validation must be less than or equal to the given maximum value.
     *
     * ```
     * quantity: new FormControl('', [NumberValidators.max(100)]),
     * ```
     * @param {number} maxVal The maximum allowed value
     * @returns {ValidatorFn}
     */
    export const max = (maxVal: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null =>
            _compare(c.value, maxVal, '<=') ? null : { max: true };
    };

    /**
     * The field under validation must be greater than or equal to the given minimum value.
     *
     * ```
     * age: new FormControl('', [NumberValidators.min(18)]),
     * ```
     * @param {number} minVal The minimum allowed value
     * @returns {ValidatorFn}
     */
    export const min = (minVal: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null =>
            _compare(c.value, minVal, '>=') ? null : { min: true };
    };

    /**
     * The field under validation must be a negative number (less than 0).
     *
     * ```
     * temperature: new FormControl('', [NumberValidators.negative]),
     * ```
     * @returns {ValidationErrors | null}
     */
    export const negative = (c: AbstractControl): ValidationErrors | null =>
        _compare(c.value, 0, '<') ? null : { negative: true };

    /**
     * The field under validation must be numeric (integer or floating point).
     *
     * ```
     * price: new FormControl('', [NumberValidators.numeric]),
     * ```
     * @returns {ValidationErrors | null}
     */
    export const numeric = (c: AbstractControl): ValidationErrors | null =>
        isNumeric(c.value) ? null : { numeric: true };

    /**
     * The field under validation must be a positive number (greater than 0).
     *
     * ```
     * amount: new FormControl('', [NumberValidators.positive]),
     * ```
     * @returns {ValidationErrors | null}
     */
    export const positive = (c: AbstractControl): ValidationErrors | null =>
        _compare(c.value, 0, '>') ? null : { positive: true };
}
