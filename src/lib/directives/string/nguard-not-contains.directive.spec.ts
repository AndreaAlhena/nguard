import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardNotContainsDirective } from './nguard-not-contains.directive';
import { createAbstractControlSpy, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardNotContainsDirective', () => {
    let control: AbstractControl;
    let directive: NguardNotContainsDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardNotContainsDirective,
            '<div [nguardNotContains]="$any(value)"></div>',
            'badword'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when string contains none of the substrings', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate with array of substrings, none matching', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        host.value = ['python', 'rust'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when string contains one of the substrings', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        host.value = 'angular';
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ notContains: true });
    });

    it('should fail when string contains any of the substrings', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        host.value = ['python', 'angular'];
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ notContains: true });
    });
});
