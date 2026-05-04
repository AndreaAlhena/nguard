import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardDoesntEndWithDirective } from './nguard-doesnt-end-with.directive';
import { createAbstractControlSpy, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardDoesntEndWithDirective', () => {
    let control: AbstractControl;
    let directive: NguardDoesntEndWithDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardDoesntEndWithDirective,
            '<div [nguardDoesntEndWith]="$any(value)"></div>',
            'C12'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a field that doesnt end with (single value / no array)', () => {
        control = createAbstractControlSpy('abcABC123');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate a field that doesnt end with', () => {
        control = createAbstractControlSpy('abcABC123');
        host.value = ['abc', 'C12'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail if the field ends with (single value / no array)', () => {
        control = createAbstractControlSpy('abcABC123');
        host.value = '123';
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ doesntEndWith: true });
    });

    it('should fail if the field ends with', () => {
        control = createAbstractControlSpy('abcABC123');
        host.value = ['123'];
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ doesntEndWith: true });
    });

    it('should fail if the field ends with (mixed types)', () => {
        control = createAbstractControlSpy('abcABC123');
        host.value = [123];
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ doesntEndWith: true });
    });
});
