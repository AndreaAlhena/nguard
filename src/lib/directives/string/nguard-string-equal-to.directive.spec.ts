import { AbstractControl } from '@angular/forms';
import { NguardStringEqualToDirective } from './nguard-string-equal-to.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardStringEqualToDirective', () => {
    let control: AbstractControl;
    let directive: NguardStringEqualToDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardStringEqualToDirective,
            '<div [nguardStringEqualTo]="$any(value)"></div>',
            'expected'
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when equal', () => {
        control = createAbstractControlSpy('expected');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when not equal', () => {
        control = createAbstractControlSpy('other');

        expect(directive.validate(control)).toEqual({ equalTo: true });
    });
});
