import { AbstractControl } from '@angular/forms';
import { NguardArrayDirective } from './nguard-array.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardArrayDirective', () => {
    let control: AbstractControl;
    let directive: NguardArrayDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardArrayDirective, '<div nguardArray></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an array', () => {
        control = createAbstractControlSpy([1, 2]);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on a non-array', () => {
        control = createAbstractControlSpy('x');

        expect(directive.validate(control)).toEqual({ array: true });
    });
});
