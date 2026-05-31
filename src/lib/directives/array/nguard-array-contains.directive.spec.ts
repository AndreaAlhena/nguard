import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardArrayContainsDirective } from './nguard-array-contains.directive';
import { createAbstractControlSpy, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardArrayContainsDirective', () => {
    let control: AbstractControl;
    let directive: NguardArrayContainsDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardArrayContainsDirective,
            '<div [nguardArrayContains]="$any(value)"></div>',
            ['a', 'b']
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when all required values are present / array config', () => {
        control = createAbstractControlSpy(['a', 'b', 'c']);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when a required value is missing / array config', () => {
        control = createAbstractControlSpy(['a']);

        expect(directive.validate(control)).toEqual({ contains: true });
    });

    it('should accept a single value shorthand', () => {
        host.value = 'a';
        fixture.detectChanges();
        control = createAbstractControlSpy(['a', 'b']);

        expect(directive.validate(control)).toBeNull();
    });
});
