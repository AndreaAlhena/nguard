import { AbstractControl } from '@angular/forms';
import { NguardStringNotEqualToDirective } from './nguard-string-not-equal-to.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardStringNotEqualToDirective', () => {
    let control: AbstractControl;
    let directive: NguardStringNotEqualToDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardStringNotEqualToDirective,
            '<div [nguardStringNotEqualTo]="$any(value)"></div>',
            'forbidden'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when not equal', () => {
        control = createAbstractControlSpy('allowed');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when equal', () => {
        control = createAbstractControlSpy('forbidden');

        expect(directive.validate(control)).toEqual({ notEqualTo: true });
    });
});
