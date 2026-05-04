import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RangeValidatorErrors } from '../errors/range-validator.errors';

const isNumeric = (value: unknown): boolean => {
    if (value === null || value === undefined || value === '') {
        return false;
    }
    const num = Number(value);
    return !isNaN(num) && isFinite(num);
};

const _digitCount = (value: unknown): number | null => {
    if (!isNumeric(value)) {
        return null;
    }
    const num = Math.abs(Number(value));
    if (!Number.isInteger(num)) {
        return null;
    }
    return String(num).length;
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
     * The field under validation must be a number with a specific count of decimal places.
     * Pass a single argument for exact match (e.g. `decimal(2)` requires `1.23`),
     * or two arguments for an inclusive range (e.g. `decimal(1, 3)` accepts `1.2`, `1.23`, `1.234`).
     *
     * ```
     * price: new FormControl('', [NumberValidators.decimal(2)]),
     * ```
     *
     * @param {number} minPlaces Required (or minimum) decimal places
     * @param {number} [maxPlaces] Optional maximum decimal places (range form)
     * @returns {ValidatorFn}
     */
    export const decimal = (minPlaces: number, maxPlaces?: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (maxPlaces !== undefined && minPlaces > maxPlaces) {
                throw new RangeValidatorErrors.MinGreaterThanMax();
            }
            if (!isNumeric(c.value)) {
                return { decimal: true };
            }
            const str = String(c.value);
            const dotIndex = str.indexOf('.');
            const places = dotIndex === -1 ? 0 : str.length - dotIndex - 1;
            const ok = maxPlaces === undefined ? places === minPlaces : places >= minPlaces && places <= maxPlaces;
            return ok ? null : { decimal: true };
        };
    };

    /**
     * The field under validation must be an integer with exactly `n` digits (sign and decimal point excluded).
     *
     * ```
     * pin: new FormControl('', [NumberValidators.digits(4)]),
     * ```
     *
     * @param {number} n The required digit count
     * @returns {ValidatorFn}
     */
    export const digits = (n: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const count = _digitCount(c.value);
            return count === n ? null : { digits: true };
        };
    };

    /**
     * The field under validation must be an integer whose digit count falls within `[minVal, maxVal]` (inclusive).
     *
     * ```
     * code: new FormControl('', [NumberValidators.digitsBetween(4, 6)]),
     * ```
     *
     * @param {number} minVal Minimum digit count
     * @param {number} maxVal Maximum digit count
     * @returns {ValidatorFn}
     */
    export const digitsBetween = (minVal: number, maxVal: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (minVal > maxVal) {
                throw new RangeValidatorErrors.MinGreaterThanMax();
            }
            const count = _digitCount(c.value);
            return count !== null && count >= minVal && count <= maxVal ? null : { digitsBetween: true };
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
     * The field under validation must be an integer with at most `n` digits.
     *
     * ```
     * code: new FormControl('', [NumberValidators.maxDigits(6)]),
     * ```
     *
     * @param {number} n Maximum digit count
     * @returns {ValidatorFn}
     */
    export const maxDigits = (n: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const count = _digitCount(c.value);
            return count !== null && count <= n ? null : { maxDigits: true };
        };
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
     * The field under validation must be an integer with at least `n` digits.
     *
     * ```
     * id: new FormControl('', [NumberValidators.minDigits(4)]),
     * ```
     *
     * @param {number} n Minimum digit count
     * @returns {ValidatorFn}
     */
    export const minDigits = (n: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const count = _digitCount(c.value);
            return count !== null && count >= n ? null : { minDigits: true };
        };
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
