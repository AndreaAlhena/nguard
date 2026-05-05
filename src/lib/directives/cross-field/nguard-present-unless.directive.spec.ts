import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardPresentUnlessDirective } from './nguard-present-unless.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardPresentUnlessDirective', () => {
    let control: AbstractControl;
    let directive: NguardPresentUnlessDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardPresentUnlessDirective,
            '<div [nguardPresentUnless]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when sibling is truthy and bypasses the rule / config as string', () => {
        control = createAbstractControlSpyWithSibling(null, 'sibling');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling is empty and field is null / config as string', () => {
        control = createAbstractControlSpyWithSibling(null, '');

        expect(directive.validate(control)).toEqual({ presentUnless: true });
    });

    it('should pass when sibling matches trigger value and field is null / config as object', () => {
        control = createAbstractControlSpyWithSibling(null, 'US');
        host.value = { fieldKey: 'fieldKey', value: 'US' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling does not match trigger value and field is undefined / config as object', () => {
        control = createAbstractControlSpyWithSibling(undefined, 'CA');
        host.value = { fieldKey: 'fieldKey', value: 'US' };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ presentUnless: true });
    });

    it('should pass with empty string field when condition not met (present but empty)', () => {
        control = createAbstractControlSpyWithSibling('', '');
        host.value = { fieldKey: 'fieldKey', value: 'US' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });
});
