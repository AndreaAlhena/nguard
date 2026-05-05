import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardRequiredUnlessDirective } from './nguard-required-unless.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardRequiredUnlessDirective', () => {
    let control: AbstractControl;
    let directive: NguardRequiredUnlessDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardRequiredUnlessDirective,
            '<div [nguardRequiredUnless]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when sibling is truthy / config as string (condition bypasses requirement)', () => {
        control = createAbstractControlSpyWithSibling('', 'sibling');

        expect(directive.validate(control)).toBeNull();
    });

    it('should require the field when sibling is falsy / config as string', () => {
        control = createAbstractControlSpyWithSibling('', '');

        expect(directive.validate(control)).toEqual({ requiredUnless: true });
    });

    it('should pass when sibling matches the trigger value / config as object', () => {
        control = createAbstractControlSpyWithSibling('', 'US');
        host.value = { fieldKey: 'fieldKey', value: 'US' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should require the field when sibling does not match the trigger value / config as object', () => {
        control = createAbstractControlSpyWithSibling('', 'CA');
        host.value = { fieldKey: 'fieldKey', value: 'US' };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ requiredUnless: true });
    });

    it('should treat string and number as equal under non strict comparison / config as object', () => {
        control = createAbstractControlSpyWithSibling('', '1');
        host.value = { fieldKey: 'fieldKey', value: 1 };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should distinguish string and number under strict comparison / config as object', () => {
        control = createAbstractControlSpyWithSibling('', '1');
        host.value = { fieldKey: 'fieldKey', isStrict: true, value: 1 };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ requiredUnless: true });
    });
});
