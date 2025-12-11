import { AbstractControl } from '@angular/forms';
import { NguardRequiredIfDirective } from './nguard-required-if.directive';
import { createAbstractControlSpyWithSibling } from '../../utils/test.utils';

describe('NguardRequiredIfDirective', () => {
    let control: AbstractControl;
    let directive: NguardRequiredIfDirective;

    beforeEach(() => {
        directive = new NguardRequiredIfDirective();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate if both the fields are set / config as string', () => {
        control = createAbstractControlSpyWithSibling('value1', 'value2');
        directive.config = 'fieldKey';

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate if both the fields are set / config as object - fieldKey only', () => {
        control = createAbstractControlSpyWithSibling('value1', 'value2');
        directive.config = { fieldKey: 'fieldKey' };

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate if both the fields are set / config as object - fieldKey and value', () => {
        control = createAbstractControlSpyWithSibling('value1', 'value2');
        directive.config = { fieldKey: 'fieldKey', value: 'value2' };

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate if both the fields are set / config as object - fieldKey and value, non strict', () => {
        control = createAbstractControlSpyWithSibling('value1', '1');
        directive.config = { fieldKey: 'fieldKey', value: 1 };

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail if both the fields are set / config as object - fieldKey and value of different types, strict', () => {
        control = createAbstractControlSpyWithSibling('value1', '1');
        directive.config = { fieldKey: 'fieldKey', isStrict: true, value: 1 };

        expect(directive.validate(control)).toEqual({ requiredIf: true });
    });
});
