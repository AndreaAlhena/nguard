import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardProhibitedIfDirective } from './nguard-prohibited-if.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardProhibitedIfDirective', () => {
    let control: AbstractControl;
    let directive: NguardProhibitedIfDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardProhibitedIfDirective,
            '<div [nguardProhibitedIf]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when sibling is empty (condition not met) / config as string', () => {
        control = createAbstractControlSpyWithSibling('value', '');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling is truthy and field is filled / config as string', () => {
        control = createAbstractControlSpyWithSibling('value', 'sibling');

        expect(directive.validate(control)).toEqual({ prohibitedIf: true });
    });

    it('should pass when sibling is truthy but field is empty / config as string', () => {
        control = createAbstractControlSpyWithSibling('', 'sibling');

        expect(directive.validate(control)).toBeNull();
    });

    it('should pass when sibling matches trigger value but field is empty / config as object', () => {
        control = createAbstractControlSpyWithSibling('', 'admin');
        host.value = { fieldKey: 'fieldKey', value: 'admin' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling matches trigger value and field is filled / config as object', () => {
        control = createAbstractControlSpyWithSibling('value', 'admin');
        host.value = { fieldKey: 'fieldKey', value: 'admin' };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ prohibitedIf: true });
    });

    it('should distinguish string and number under strict comparison / config as object', () => {
        control = createAbstractControlSpyWithSibling('value', '1');
        host.value = { fieldKey: 'fieldKey', isStrict: true, value: 1 };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });
});
