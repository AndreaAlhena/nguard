import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardDeclinedIfDirective } from './nguard-declined-if.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardDeclinedIfDirective', () => {
    let control: AbstractControl;
    let directive: NguardDeclinedIfDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardDeclinedIfDirective,
            '<div [nguardDeclinedIf]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when sibling is empty (condition not met) / config as string', () => {
        control = createAbstractControlSpyWithSibling(true, '');

        expect(directive.validate(control)).toBeNull();
    });

    it('should pass when sibling is truthy and value is in the declined set / config as string', () => {
        control = createAbstractControlSpyWithSibling('no', 'sibling');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling is truthy and value is not in the declined set / config as string', () => {
        control = createAbstractControlSpyWithSibling(true, 'sibling');

        expect(directive.validate(control)).toEqual({ declinedIf: true });
    });

    it('should pass when sibling matches trigger value and value is declined / config as object', () => {
        control = createAbstractControlSpyWithSibling(false, 'guest');
        host.value = { fieldKey: 'fieldKey', value: 'guest' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when sibling matches trigger value and value is not declined / config as object', () => {
        control = createAbstractControlSpyWithSibling('No', 'guest');
        host.value = { fieldKey: 'fieldKey', value: 'guest' };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ declinedIf: true });
    });

    it('should distinguish string and number under strict comparison / config as object', () => {
        control = createAbstractControlSpyWithSibling(true, '1');
        host.value = { fieldKey: 'fieldKey', isStrict: true, value: 1 };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });
});
