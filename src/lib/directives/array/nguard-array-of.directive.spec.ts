import { AbstractControl } from '@angular/forms';
import { NguardArrayOfDirective } from './nguard-array-of.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

const isString = (c: AbstractControl) => (typeof c.value === 'string' ? null : { notString: true });

describe('NguardArrayOfDirective', () => {
    let control: AbstractControl;
    let directive: NguardArrayOfDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardArrayOfDirective,
            '<div [nguardArrayOf]="$any(value)"></div>',
            isString
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when every item passes the inner validator', () => {
        control = createAbstractControlSpy(['a', 'b']);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when an item fails the inner validator', () => {
        control = createAbstractControlSpy(['a', 1]);

        expect(directive.validate(control)).toEqual({ arrayOf: true });
    });
});
