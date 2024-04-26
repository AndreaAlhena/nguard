import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export namespace NumberValidators {

    export const range = (min: number, max: number): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
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