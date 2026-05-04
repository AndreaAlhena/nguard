import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardStartsWithDirective } from './nguard-starts-with.directive';
import { createAbstractControlSpy, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardStartsWithDirective', () => {
    let control: AbstractControl;
    let directive: NguardStartsWithDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardStartsWithDirective,
            '<div [nguardStartsWith]="$any(value)"></div>',
            'abc'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a field that starts with (single value / no array)', () => {
        control = createAbstractControlSpy('abcABC123');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate a field that starts with', () => {
        control = createAbstractControlSpy('abcABC123');
        host.value = ['123', 'abc'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail if the field doesnt start with (single value / no array)', () => {
        control = createAbstractControlSpy('abcABC123');
        host.value = '123';
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ startsWith: true });
    });

    it('should fail if the field doesnt start with', () => {
        control = createAbstractControlSpy('abcABC123');
        host.value = ['123', '456'];
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ startsWith: true });
    });
});
