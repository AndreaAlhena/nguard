import { AbstractControl } from '@angular/forms';
import { NguardSizeBetweenDirective } from './nguard-size-between.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardSizeBetweenDirective', () => {
    let control: AbstractControl;
    let directive: NguardSizeBetweenDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardSizeBetweenDirective,
            '<div [nguardSizeBetween]="$any(value)"></div>',
            [1, 3]
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an array within the range', () => {
        control = createAbstractControlSpy([1, 2]);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail below the range', () => {
        control = createAbstractControlSpy([]);

        expect(directive.validate(control)).toEqual({ sizeBetween: true });
    });

    it('should fail above the range', () => {
        control = createAbstractControlSpy([1, 2, 3, 4]);

        expect(directive.validate(control)).toEqual({ sizeBetween: true });
    });
});
