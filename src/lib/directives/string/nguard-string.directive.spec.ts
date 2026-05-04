import { AbstractControl } from '@angular/forms';
import { NguardStringDirective } from './nguard-string.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardStringDirective', () => {
    let control: AbstractControl;
    let directive: NguardStringDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardStringDirective, '<div nguardString></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a string', () => {
        control = createAbstractControlSpy('hello');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on a number', () => {
        control = createAbstractControlSpy(42);

        expect(directive.validate(control)).toEqual({ string: true });
    });

    it('should fail on null', () => {
        control = createAbstractControlSpy(null);

        expect(directive.validate(control)).toEqual({ string: true });
    });
});
