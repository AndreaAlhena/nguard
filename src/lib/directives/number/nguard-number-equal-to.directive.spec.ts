import { AbstractControl } from '@angular/forms';
import { NguardNumberEqualToDirective } from './nguard-number-equal-to.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardNumberEqualToDirective', () => {
    let control: AbstractControl;
    let directive: NguardNumberEqualToDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardNumberEqualToDirective,
            '<div [nguardNumberEqualTo]="$any(value)"></div>',
            42
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when equal (with coercion)', () => {
        control = createAbstractControlSpy('42');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when not equal', () => {
        control = createAbstractControlSpy(7);

        expect(directive.validate(control)).toEqual({ equalTo: true });
    });
});
