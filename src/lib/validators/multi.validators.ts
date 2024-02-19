import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { equalityCheck } from "../utils/validators.utils";

export namespace MultiValidators {
    /**
     * Validate that an attribute is different to another one with the specified compareFieldKey
     * The performed check is case sensitive for strings
     * 
     * ```
     * password: new FormControl(''),
     * passwordConfirm: new FormControl('', [MultiValidators.different('password')])
     * ```
     * @return {ValidationFn}
     */
    export const different = (compareFieldKey: string, isStrict: boolean = false): ValidatorFn => {
        return (c: AbstractControl): ValidationErrors | null => {
            if ( equalityCheck(c.value, c.parent?.get(compareFieldKey)?.value, isStrict) ) {
                return {
                    different: true
                };
            }

            return null;
        }
    }
}