import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardDifferentDirective } from './nguard-different.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardDifferentDirective', () => {
    let control: AbstractControl;
    let directive: NguardDifferentDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardDifferentDirective,
            '<div [nguardDifferent]="$any(value)"></div>',
            ''
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate two fields with different values, simple string as config and same types (strict disabled / not given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, same types (strict disabled / not given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        host.value = { fieldKey: '' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, same types (strict disabled / given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        host.value = { fieldKey: '', isStrict: false };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, same types (strict enabled / given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        host.value = { fieldKey: '', isStrict: true };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, different types (strict disabled / not given)', () => {
        control = createAbstractControlSpyWithSibling('1', 0);
        host.value = { fieldKey: '' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, different types (strict disabled / given)', () => {
        control = createAbstractControlSpyWithSibling('1', 0);
        host.value = { fieldKey: '', isStrict: false };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with different values, different types (strict enabled / given)', () => {
        control = createAbstractControlSpyWithSibling('1', 0);
        host.value = { fieldKey: '', isStrict: true };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail if two fields have the same values (strict enabled / given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        host.value = { fieldKey: '', isStrict: true };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ different: true });
    });

    it('should fail if two fields have the same values (strict disabled / given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        host.value = { fieldKey: '', isStrict: false };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ different: true });
    });

    it('should fail if two fields have the same values (strict disabled / not given)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        host.value = { fieldKey: '' };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ different: true });
    });

    it('should fail if two fields have the same values but different types (strict disabled / not given)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        host.value = { fieldKey: '' };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ different: true });
    });

    it('should fail if two fields have the same values but different types (strict disabled / given)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        host.value = { fieldKey: '', isStrict: false };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ different: true });
    });
});
