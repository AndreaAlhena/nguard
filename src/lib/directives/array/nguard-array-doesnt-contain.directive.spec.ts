import { AbstractControl } from '@angular/forms';
import { NguardArrayDoesntContainDirective } from './nguard-array-doesnt-contain.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardArrayDoesntContainDirective', () => {
    let control: AbstractControl;
    let directive: NguardArrayDoesntContainDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardArrayDoesntContainDirective,
            '<div [nguardArrayDoesntContain]="$any(value)"></div>',
            ['x', 'y']
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when no forbidden values are present', () => {
        control = createAbstractControlSpy(['a', 'b']);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when a forbidden value is present', () => {
        control = createAbstractControlSpy(['a', 'x']);

        expect(directive.validate(control)).toEqual({ doesntContain: true });
    });
});
