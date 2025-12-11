import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RangeValidatorErrors } from '../errors/range-validator.errors';

export namespace NumberValidators {
    /**
     * Validate that an attribute is in the given range of numbers (min & max values)
     *
     * ```
     * age: new FormControl('', [NumberValidators.range(10, 20)]),
     * ```
     * @return {ValidationFn}
     */
    export const range = (min: number, max: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if (min > max) {
                throw new RangeValidatorErrors.MinGreaterThanMax();
            }

            const value = +c.value;

            if (isNaN(value) || value < min || value > max) {
                return {
                    range: true,
                };
            }

            return null;
        };
    };
}
