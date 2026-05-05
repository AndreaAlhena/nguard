import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardRequiredWithoutAllDirective } from './nguard-required-without-all.directive';
import {
    createAbstractControlSpyWithSibling,
    createAbstractControlSpyWithSiblings,
    createDirectiveFixture,
    TestHostComponent,
} from '../../utils/test.utils';

describe('NguardRequiredWithoutAllDirective', () => {
    let control: AbstractControl;
    let directive: NguardRequiredWithoutAllDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardRequiredWithoutAllDirective,
            '<div [nguardRequiredWithoutAll]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should require the field when the single string sibling is empty', () => {
        control = createAbstractControlSpyWithSibling('', '');

        expect(directive.validate(control)).toEqual({ requiredWithoutAll: true });
    });

    it('should bypass the rule when the single string sibling is filled', () => {
        control = createAbstractControlSpyWithSibling('', 'sibling');

        expect(directive.validate(control)).toBeNull();
    });

    it('should require the field when every sibling in the array is empty', () => {
        control = createAbstractControlSpyWithSiblings('', { email: '', phone: '' });
        host.value = ['email', 'phone'];
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ requiredWithoutAll: true });
    });

    it('should bypass the rule when at least one sibling in the array is filled', () => {
        control = createAbstractControlSpyWithSiblings('', { email: 'a@b.c', phone: '' });
        host.value = ['email', 'phone'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should pass when every sibling is empty and the field is filled', () => {
        control = createAbstractControlSpyWithSiblings('value', { email: '', phone: '' });
        host.value = ['email', 'phone'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });
});
