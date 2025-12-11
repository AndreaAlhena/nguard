import { AbstractControl } from '@angular/forms';
import { NguardUrlDirective } from './nguard-url.directive';
import { createAbstractControlSpy } from '../../utils/test.utils';

describe('NguardUrlDirective', () => {
    let control: AbstractControl;
    let directive: NguardUrlDirective;

    beforeEach(() => {
        directive = new NguardUrlDirective();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a proper url', () => {
        control = createAbstractControlSpy('https://www.google.com');

        expect(directive.validate(control)).toBeNull();
    });

    it('should invalidate a non properly formatted url', () => {
        control = createAbstractControlSpy('');

        expect(directive.validate(control)).toEqual({ url: true });
    });
});
