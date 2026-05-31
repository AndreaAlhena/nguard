import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { equalityCheck, primitive } from '../utils/validators.utils';

export namespace ArrayValidators {
    /**
     * Validate that the value is a JavaScript array.
     *
     * ```
     * new FormControl([], [NguardValidators.Array.array])
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const array: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        return Array.isArray(c.value) ? null : { array: true };
    };

    /**
     * Validate that every item in the array passes the supplied validator. Each item is wrapped
     * in a transient FormControl before being handed to the validator, so only self-contained
     * (non cross-field) item validators are supported. A non-array value fails.
     *
     * ```
     * new FormControl(['a@b.com'], [
     *   NguardValidators.Array.arrayOf(NguardValidators.String.email)
     * ])
     * ```
     *
     * @param {ValidatorFn} validator The validator applied to each item
     * @returns {ValidatorFn}
     */
    export const arrayOf = (validator: ValidatorFn): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!Array.isArray(c.value)) {
                return { arrayOf: true };
            }

            const allValid = c.value.every((item: unknown) => validator(new FormControl(item)) === null);

            return allValid ? null : { arrayOf: true };
        };
    };

    /**
     * Validate that the array contains every one of the given values (membership via Array.includes).
     * A non-array value fails.
     *
     * ```
     * new FormControl(['a', 'b'], [NguardValidators.Array.contains('a', 'b')])
     * ```
     *
     * @param {...primitive} values The values that must all be present
     * @returns {ValidatorFn}
     */
    export const contains = (...values: primitive[]): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!Array.isArray(c.value)) {
                return { contains: true };
            }

            const containsAll = values.every((value: primitive) => c.value.includes(value));

            return containsAll ? null : { contains: true };
        };
    };

    /**
     * Validate that the array has no duplicate values. Uniqueness is determined with Set
     * value-equality, so primitives are compared by value and objects by reference.
     * A non-array value fails.
     *
     * ```
     * new FormControl([1, 2, 3], [NguardValidators.Array.distinct])
     * ```
     *
     * @returns {ValidationErrors | null}
     */
    export const distinct: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        if (!Array.isArray(c.value)) {
            return { distinct: true };
        }

        return new Set(c.value).size === c.value.length ? null : { distinct: true };
    };

    /**
     * Validate that the array contains none of the given values (membership via Array.includes).
     * A non-array value fails.
     *
     * ```
     * new FormControl(['a'], [NguardValidators.Array.doesntContain('x', 'y')])
     * ```
     *
     * @param {...primitive} values The values that must all be absent
     * @returns {ValidatorFn}
     */
    export const doesntContain = (...values: primitive[]): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!Array.isArray(c.value)) {
                return { doesntContain: true };
            }

            const containsNone = values.every((value: primitive) => !c.value.includes(value));

            return containsNone ? null : { doesntContain: true };
        };
    };

    /**
     * Validate that the value is a member of a sibling field's array. Fails when the sibling is
     * missing or is not an array.
     *
     * ```
     * new FormGroup({
     *   allowedColors: new FormControl(['red', 'green']),
     *   color: new FormControl('red', [NguardValidators.Array.inArray('allowedColors')]),
     * })
     * ```
     *
     * @param {string} fieldKey The key of the sibling field holding the array
     * @param {boolean} [isStrict] If true, membership uses strict equality (===); loose (==) otherwise
     * @returns {ValidatorFn}
     */
    export const inArray = (fieldKey: string, isStrict: boolean = true): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const sibling = c.parent?.get(fieldKey)?.value;

            if (!Array.isArray(sibling)) {
                return { inArray: true };
            }

            const isMember = sibling.some((item: unknown) => equalityCheck(item, c.value, isStrict));

            return isMember ? null : { inArray: true };
        };
    };

    /**
     * Validate that the array has at most `max` items. A non-array value fails.
     *
     * ```
     * new FormControl([1, 2], [NguardValidators.Array.maxSize(3)])
     * ```
     *
     * @param {number} max The maximum number of items (inclusive)
     * @returns {ValidatorFn}
     */
    export const maxSize = (max: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!Array.isArray(c.value)) {
                return { maxSize: true };
            }

            return c.value.length <= max ? null : { maxSize: true };
        };
    };

    /**
     * Validate that the array has at least `min` items. A non-array value fails.
     *
     * ```
     * new FormControl([1, 2], [NguardValidators.Array.minSize(1)])
     * ```
     *
     * @param {number} min The minimum number of items (inclusive)
     * @returns {ValidatorFn}
     */
    export const minSize = (min: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!Array.isArray(c.value)) {
                return { minSize: true };
            }

            return c.value.length >= min ? null : { minSize: true };
        };
    };

    /**
     * Validate that the value is a non-null object containing every one of the given keys.
     * Maps Laravel's `required_array_keys` rule to a plain object.
     *
     * ```
     * new FormControl({ id: 1, name: 'x' }, [
     *   NguardValidators.Array.requiredArrayKeys('id', 'name')
     * ])
     * ```
     *
     * @param {...string} keys The keys that must all be present
     * @returns {ValidatorFn}
     */
    export const requiredArrayKeys = (...keys: string[]): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            const value = c.value;

            if (typeof value !== 'object' || value === null) {
                return { requiredArrayKeys: true };
            }

            const hasAllKeys = keys.every((key: string) => key in value);

            return hasAllKeys ? null : { requiredArrayKeys: true };
        };
    };

    /**
     * Validate that the array item count is within `[min, max]` inclusive. A non-array value fails.
     *
     * ```
     * new FormControl([1, 2], [NguardValidators.Array.sizeBetween(1, 3)])
     * ```
     *
     * @param {number} min The minimum number of items (inclusive)
     * @param {number} max The maximum number of items (inclusive)
     * @returns {ValidatorFn}
     */
    export const sizeBetween = (min: number, max: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (!Array.isArray(c.value)) {
                return { sizeBetween: true };
            }

            const length = c.value.length;

            return length >= min && length <= max ? null : { sizeBetween: true };
        };
    };
}
