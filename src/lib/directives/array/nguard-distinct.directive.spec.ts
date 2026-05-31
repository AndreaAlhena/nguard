import { AbstractControl } from '@angular/forms';
import { NguardDistinctDirective } from './nguard-distinct.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardDistinctDirective', () => {
    let control: AbstractControl;
    let directive: NguardDistinctDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardDistinctDirective, '<div nguardDistinct></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an array of unique values', () => {
        control = createAbstractControlSpy([1, 2, 3]);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on duplicate values', () => {
        control = createAbstractControlSpy([1, 1]);

        expect(directive.validate(control)).toEqual({ distinct: true });
    });
});
