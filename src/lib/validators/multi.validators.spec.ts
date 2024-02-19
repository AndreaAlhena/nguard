import { AbstractControl } from "@angular/forms";
import { createAbstractControlSpyWithSibling } from "../utils/test.utils";
import { MultiValidators } from "./multi.validators";

let control: jasmine.SpyObj<AbstractControl>;

describe('MultiValidators - Different', () => {
    it('Different Validator - Valid if values are different with same type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        expect(MultiValidators.different('')(control)).toBeNull();
    });
});