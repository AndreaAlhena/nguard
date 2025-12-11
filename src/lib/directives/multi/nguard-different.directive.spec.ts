import { AbstractControl } from '@angular/forms';
import { NguardDifferentDirective } from './nguard-different.directive';
import { createAbstractControlSpyWithSibling } from '../../utils/test.utils';

describe('NguardDifferentDirective', () => {
    let control: AbstractControl;
    let directive: NguardDifferentDirective;

    beforeEach(() => {
        directive = new NguardDifferentDirective();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate two fields with different values, simple string as config and same types (strict disabled / not given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        directive.config = '';

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, same types (strict disabled / not given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        directive.config = { compareFieldKey: '' };

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, same types (strict disabled / given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        directive.config = { compareFieldKey: '', isStrict: false };

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, same types (strict enabled / given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        directive.config = { compareFieldKey: '', isStrict: true };

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, different types (strict disabled / not given)', () => {
        control = createAbstractControlSpyWithSibling('1', 0);
        directive.config = { compareFieldKey: '' };

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, different types (strict disabled / given)', () => {
        control = createAbstractControlSpyWithSibling('1', 0);
        directive.config = { compareFieldKey: '', isStrict: false };

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, different types (strict enabled / given)', () => {
        control = createAbstractControlSpyWithSibling('1', 0);
        directive.config = { compareFieldKey: '', isStrict: true };

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail if two fields have the same values (strict enabled / given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        directive.config = { compareFieldKey: '', isStrict: true };

        expect(directive.validate(control)).toEqual({ different: true });
    });

    it('should fail if two fields have the same values (strict disabled / given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        directive.config = { compareFieldKey: '', isStrict: false };

        expect(directive.validate(control)).toEqual({ different: true });
    });

    it('should fail if two fields have the same values (strict disabled / not given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        directive.config = { compareFieldKey: '' };

        expect(directive.validate(control)).toEqual({ different: true });
    });

    it('should fail if two fields have the same values but different types (strict disabled / not given)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        directive.config = { compareFieldKey: '' };

        expect(directive.validate(control)).toEqual({ different: true });
    });

    it('should fail if two fields have the same values but different types (strict disabled / given)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        directive.config = { compareFieldKey: '', isStrict: false };

        expect(directive.validate(control)).toEqual({ different: true });
    });
});
