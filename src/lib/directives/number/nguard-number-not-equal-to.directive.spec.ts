import { AbstractControl } from '@angular/forms';
import { NguardNumberNotEqualToDirective } from './nguard-number-not-equal-to.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardNumberNotEqualToDirective', () => {
    let control: AbstractControl;
    let directive: NguardNumberNotEqualToDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardNumberNotEqualToDirective,
            '<div [nguardNumberNotEqualTo]="$any(value)"></div>',
            0
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when not equal', () => {
        control = createAbstractControlSpy(5);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when equal', () => {
        control = createAbstractControlSpy(0);

        expect(directive.validate(control)).toEqual({ notEqualTo: true });
    });
});
