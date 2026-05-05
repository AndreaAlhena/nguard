import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardRequiredWithoutDirective } from './nguard-required-without.directive';
import {
    createAbstractControlSpyWithSibling,
    createAbstractControlSpyWithSiblings,
    createDirectiveFixture,
    TestHostComponent,
} from '../../utils/test.utils';

describe('NguardRequiredWithoutDirective', () => {
    let control: AbstractControl;
    let directive: NguardRequiredWithoutDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardRequiredWithoutDirective,
            '<div [nguardRequiredWithout]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should require the field when the single string sibling is empty', () => {
        control = createAbstractControlSpyWithSibling('', '');

        expect(directive.validate(control)).toEqual({ requiredWithout: true });
    });

    it('should bypass the rule when the single string sibling is filled', () => {
        control = createAbstractControlSpyWithSibling('', 'sibling');

        expect(directive.validate(control)).toBeNull();
    });

    it('should require the field when any sibling in the array is empty', () => {
        control = createAbstractControlSpyWithSiblings('', { email: '', phone: 'x' });
        host.value = ['email', 'phone'];
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ requiredWithout: true });
    });

    it('should bypass the rule when every sibling in the array is filled', () => {
        control = createAbstractControlSpyWithSiblings('', { email: 'a@b.c', phone: 'x' });
        host.value = ['email', 'phone'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should pass when the field is filled and a sibling is missing', () => {
        control = createAbstractControlSpyWithSiblings('value', { email: '' });
        host.value = ['email'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });
});
