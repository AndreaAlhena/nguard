import { AbstractControl } from '@angular/forms';
import { NguardNumberNotInListDirective } from './nguard-number-not-in-list.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardNumberNotInListDirective', () => {
    let control: AbstractControl;
    let directive: NguardNumberNotInListDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardNumberNotInListDirective,
            '<div [nguardNumberNotInList]="$any(value)"></div>',
            [0, 13]
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when the value is not in the list', () => {
        control = createAbstractControlSpy(7);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when the value is in the list', () => {
        control = createAbstractControlSpy(13);

        expect(directive.validate(control)).toEqual({ notInList: true });
    });
});
