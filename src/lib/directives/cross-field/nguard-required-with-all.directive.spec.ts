import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardRequiredWithAllDirective } from './nguard-required-with-all.directive';
import {
    createAbstractControlSpyWithSibling,
    createAbstractControlSpyWithSiblings,
    createDirectiveFixture,
    TestHostComponent,
} from '../../utils/test.utils';

describe('NguardRequiredWithAllDirective', () => {
    let control: AbstractControl;
    let directive: NguardRequiredWithAllDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardRequiredWithAllDirective,
            '<div [nguardRequiredWithAll]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should require the field when the single string sibling is filled', () => {
        control = createAbstractControlSpyWithSibling('', 'sibling');

        expect(directive.validate(control)).toEqual({ requiredWithAll: true });
    });

    it('should bypass the rule when the single string sibling is empty', () => {
        control = createAbstractControlSpyWithSibling('', '');

        expect(directive.validate(control)).toBeNull();
    });

    it('should require the field when every sibling in the array is filled', () => {
        control = createAbstractControlSpyWithSiblings('', { firstName: 'Ada', lastName: 'Lovelace' });
        host.value = ['firstName', 'lastName'];
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ requiredWithAll: true });
    });

    it('should bypass the rule when at least one sibling in the array is empty', () => {
        control = createAbstractControlSpyWithSiblings('', { firstName: 'Ada', lastName: '' });
        host.value = ['firstName', 'lastName'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should pass when every sibling is filled and the field is also filled', () => {
        control = createAbstractControlSpyWithSiblings('value', { firstName: 'Ada', lastName: 'Lovelace' });
        host.value = ['firstName', 'lastName'];
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });
});
