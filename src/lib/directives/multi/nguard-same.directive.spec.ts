import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardSameDirective } from './nguard-same.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardSameDirective', () => {
    let control: AbstractControl;
    let directive: NguardSameDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardSameDirective,
            '<div [nguardSame]="$any(value)"></div>',
            ''
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate two fields with the same value (field name only / no object)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate two fields with the same value', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        host.value = { fieldKey: '' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail if two fields have different values (field name only / no object)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');

        expect(directive.validate(control)).toEqual({ same: true });
    });

    it('should fail if two fields have different values', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        host.value = { fieldKey: '' };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ same: true });
    });

    it('should validate two fields with the same value / different types (strict disabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        host.value = { fieldKey: '', isStrict: false };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail if two fields have the same value / different types (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        host.value = { fieldKey: '', isStrict: true };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ same: true });
    });
});
