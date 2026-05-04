import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardContainsDirective } from './nguard-contains.directive';
import { createAbstractControlSpy, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardContainsDirective', () => {
    let control: AbstractControl;
    let directive: NguardContainsDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardContainsDirective,
            '<div [nguardContains]="$any(value)"></div>',
            'angular'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when string contains a single substring', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate when string contains at least one of the given substrings', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        host.value = ['python', 'angular'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when string contains none of the substrings', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        host.value = ['python', 'rust'];
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ contains: true });
    });
});
