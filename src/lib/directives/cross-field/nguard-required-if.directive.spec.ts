import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { NguardRequiredIfDirective } from './nguard-required-if.directive';
import { createAbstractControlSpyWithSibling, createDirectiveFixture, TestHostComponent } from '../../utils/test.utils';

describe('NguardRequiredIfDirective', () => {
    let control: AbstractControl;
    let directive: NguardRequiredIfDirective;
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        ({ directive, fixture, host } = createDirectiveFixture(
            NguardRequiredIfDirective,
            '<div [nguardRequiredIf]="$any(value)"></div>',
            'fieldKey'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate if both the fields are set / config as string', () => {
        control = createAbstractControlSpyWithSibling('value1', 'value2');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate if both the fields are set / config as object - fieldKey only', () => {
        control = createAbstractControlSpyWithSibling('value1', 'value2');
        host.value = { fieldKey: 'fieldKey' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate if both the fields are set / config as object - fieldKey and value', () => {
        control = createAbstractControlSpyWithSibling('value1', 'value2');
        host.value = { fieldKey: 'fieldKey', value: 'value2' };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate if both the fields are set / config as object - fieldKey and value, non strict', () => {
        control = createAbstractControlSpyWithSibling('value1', '1');
        host.value = { fieldKey: 'fieldKey', value: 1 };
        fixture.detectChanges();

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail if both the fields are set / config as object - fieldKey and value of different types, strict', () => {
        control = createAbstractControlSpyWithSibling('value1', '1');
        host.value = { fieldKey: 'fieldKey', isStrict: true, value: 1 };
        fixture.detectChanges();

        expect(directive.validate(control)).toEqual({ requiredIf: true });
    });
});
