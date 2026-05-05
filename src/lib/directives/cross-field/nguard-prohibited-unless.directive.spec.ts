import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardProhibitedUnlessDirective } from './nguard-prohibited-unless.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardProhibitedUnlessDirective', () => {
    let control: AbstractControl;
    let directive: NguardProhibitedUnlessDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardProhibitedUnlessDirective,
            '<div [nguardProhibitedUnless]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when sibling is truthy (rule bypassed) / config as string', () => {
        control = createAbstractControlSpyWithSibling('value', 'sibling');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling is empty and field is filled / config as string', () => {
        control = createAbstractControlSpyWithSibling('value', '');

        expect(directive.validate(control)).toEqual({ prohibitedUnless: true });
    });

    it('should pass when sibling is empty and field is also empty / config as string', () => {
        control = createAbstractControlSpyWithSibling('', '');

        expect(directive.validate(control)).toBeNull();
    });

    it('should pass when sibling matches trigger value and field is filled / config as object', () => {
        control = createAbstractControlSpyWithSibling('value', 'admin');
        host.value = { fieldKey: 'fieldKey', value: 'admin' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling does not match trigger value and field is filled / config as object', () => {
        control = createAbstractControlSpyWithSibling('value', 'guest');
        host.value = { fieldKey: 'fieldKey', value: 'admin' };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ prohibitedUnless: true });
    });

    it('should distinguish string and number under strict comparison / config as object', () => {
        control = createAbstractControlSpyWithSibling('value', '1');
        host.value = { fieldKey: 'fieldKey', isStrict: true, value: 1 };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ prohibitedUnless: true });
    });
});
