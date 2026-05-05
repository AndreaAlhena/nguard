import { AbstractControl } from '@angular/forms';
import { NguardFalsyDirective } from './nguard-falsy.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardFalsyDirective', () => {
    let control: AbstractControl;
    let directive: NguardFalsyDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardFalsyDirective, '<div nguardFalsy></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate false', () => {
        control = createAbstractControlSpy(false);

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate an empty string', () => {
        control = createAbstractControlSpy('');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate null', () => {
        control = createAbstractControlSpy(null);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on a truthy value', () => {
        control = createAbstractControlSpy('hello');

        expect(directive.validate(control)).toEqual({ falsy: true });
    });
});
