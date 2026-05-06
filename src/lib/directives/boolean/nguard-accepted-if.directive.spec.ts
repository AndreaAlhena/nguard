import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardAcceptedIfDirective } from './nguard-accepted-if.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardAcceptedIfDirective', () => {
    let control: AbstractControl;
    let directive: NguardAcceptedIfDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardAcceptedIfDirective,
            '<div [nguardAcceptedIf]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when sibling is empty (condition not met) / config as string', () => {
        control = createAbstractControlSpyWithSibling(false, '');

        expect(directive.validate(control)).toBeNull();
    });

    it('should pass when sibling is truthy and value is in the accepted set / config as string', () => {
        control = createAbstractControlSpyWithSibling('yes', 'sibling');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling is truthy and value is not in the accepted set / config as string', () => {
        control = createAbstractControlSpyWithSibling(false, 'sibling');

        expect(directive.validate(control)).toEqual({ acceptedIf: true });
    });

    it('should pass when sibling matches trigger value and value is accepted / config as object', () => {
        control = createAbstractControlSpyWithSibling(true, 'pro');
        host.value = { fieldKey: 'fieldKey', value: 'pro' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling matches trigger value and value is not accepted / config as object', () => {
        control = createAbstractControlSpyWithSibling('Yes', 'pro');
        host.value = { fieldKey: 'fieldKey', value: 'pro' };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ acceptedIf: true });
    });

    it('should distinguish string and number under strict comparison / config as object', () => {
        control = createAbstractControlSpyWithSibling(false, '1');
        host.value = { fieldKey: 'fieldKey', isStrict: true, value: 1 };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });
});
