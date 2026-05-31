import { AbstractControl } from '@angular/forms';
import { NguardMaxSizeDirective } from './nguard-max-size.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardMaxSizeDirective', () => {
    let control: AbstractControl;
    let directive: NguardMaxSizeDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardMaxSizeDirective,
            '<div [nguardMaxSize]="$any(value)"></div>',
            2
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an array at or below the maximum', () => {
        control = createAbstractControlSpy([1, 2]);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail above the maximum', () => {
        control = createAbstractControlSpy([1, 2, 3]);

        expect(directive.validate(control)).toEqual({ maxSize: true });
    });
});
