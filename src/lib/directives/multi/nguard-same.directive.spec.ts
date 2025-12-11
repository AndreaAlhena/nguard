import { AbstractControl } from '@angular/forms';
import { NguardSameDirective } from './nguard-same.directive';
import { createAbstractControlSpyWithSibling } from '../../utils/test.utils';

describe('NguardSameDirective', () => {
    let control: AbstractControl;
    let directive: NguardSameDirective;

    beforeEach(() => {
        directive = new NguardSameDirective();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate two fields with the same value (field name only / no object)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        directive.config = '';

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with the same value', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        directive.config = { compareFieldKey: '' };

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail if two fields have different values (field name only / no object)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        directive.config = '';

        expect(directive.validate(control)).toEqual({ same: true });
    });

    it('should fail if two fields have different values', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        directive.config = { compareFieldKey: '' };

        expect(directive.validate(control)).toEqual({ same: true });
    });

    it('should validate two fields with the same value / different types (strict disabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        directive.config = { compareFieldKey: '', isStrict: false };

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail if two fields have the same value / different types (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        directive.config = { compareFieldKey: '', isStrict: true };

        expect(directive.validate(control)).toEqual({ same: true });
    });
});
