import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardRequiredWithDirective } from './nguard-required-with.directive';
import {
    createAbstractControlSpyWithSibling,
    createAbstractControlSpyWithSiblings,
    createDirectiveFixture,
    TestHostComponent,
} from '../../utils/test.utils';

describe('NguardRequiredWithDirective', () => {
    let control: AbstractControl;
    let directive: NguardRequiredWithDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardRequiredWithDirective,
            '<div [nguardRequiredWith]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should require the field when the single string sibling is filled', () => {
        control = createAbstractControlSpyWithSibling('', 'sibling');

        expect(directive.validate(control)).toEqual({ requiredWith: true });
    });

    it('should bypass the rule when the single string sibling is empty', () => {
        control = createAbstractControlSpyWithSibling('', '');

        expect(directive.validate(control)).toBeNull();
    });

    it('should require the field when any sibling in the array is filled', () => {
        control = createAbstractControlSpyWithSiblings('', { phone: '', address: '123 Main St' });
        host.value = ['phone', 'address'];
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ requiredWith: true });
    });

    it('should bypass the rule when every sibling in the array is empty', () => {
        control = createAbstractControlSpyWithSiblings('', { phone: '', address: '' });
        host.value = ['phone', 'address'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should pass when the field is filled and a sibling is filled', () => {
        control = createAbstractControlSpyWithSiblings('value', { phone: 'x' });
        host.value = ['phone'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });
});
