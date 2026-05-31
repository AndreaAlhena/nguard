import { AbstractControl } from '@angular/forms';
import { NguardMinSizeDirective } from './nguard-min-size.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardMinSizeDirective', () => {
    let control: AbstractControl;
    let directive: NguardMinSizeDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardMinSizeDirective,
            '<div [nguardMinSize]="$any(value)"></div>',
            2
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an array at or above the minimum', () => {
        control = createAbstractControlSpy([1, 2]);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail below the minimum', () => {
        control = createAbstractControlSpy([1]);

        expect(directive.validate(control)).toEqual({ minSize: true });
    });
});
