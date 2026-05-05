import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardPresentIfDirective } from './nguard-present-if.directive';
import {
    createAbstractControlSpyWithSibling,
    createControlSpyWithNullSibling,
    createDirectiveFixture,
    TestHostComponent,
} from '../../utils/test.utils';

describe('NguardPresentIfDirective', () => {
    let control: AbstractControl;
    let directive: NguardPresentIfDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardPresentIfDirective,
            '<div [nguardPresentIf]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when sibling is empty (condition not met) / config as string', () => {
        control = createControlSpyWithNullSibling(null);

        expect(directive.validate(control)).toBeNull();
    });

    it('should pass when sibling is truthy and field has empty string (present but empty)', () => {
        control = createAbstractControlSpyWithSibling('', 'sibling');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling is truthy and field is null', () => {
        control = createAbstractControlSpyWithSibling(null, 'sibling');

        expect(directive.validate(control)).toEqual({ presentIf: true });
    });

    it('should pass when sibling matches trigger value and field is empty string / config as object', () => {
        control = createAbstractControlSpyWithSibling('', 'US');
        host.value = { fieldKey: 'fieldKey', value: 'US' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling matches trigger value and field is undefined / config as object', () => {
        control = createAbstractControlSpyWithSibling(undefined, 'US');
        host.value = { fieldKey: 'fieldKey', value: 'US' };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ presentIf: true });
    });

    it('should distinguish string and number under strict comparison / config as object', () => {
        control = createAbstractControlSpyWithSibling(null, '1');
        host.value = { fieldKey: 'fieldKey', isStrict: true, value: 1 };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });
});
