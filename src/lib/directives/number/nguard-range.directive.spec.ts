import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardRangeDirective } from './nguard-range.directive';
import { createAbstractControlSpy, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardRangeDirective', () => {
    let control: AbstractControl;
    let directive: NguardRangeDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardRangeDirective,
            '<div [nguardRange]="$any(value)"></div>'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('Should validate a number in the given range', () => {
        control = createAbstractControlSpy(5);
        host.value = [1, 5];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('Should validate a number is not in the given range', () => {
        control = createAbstractControlSpy(7);
        host.value = [1, 5];
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ range: true });
    });
});
