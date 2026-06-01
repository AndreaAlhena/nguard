import { AbstractControl } from '@angular/forms';
import { NguardIsbnDirective } from './nguard-isbn.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardIsbnDirective', () => {
    let control: AbstractControl;
    let directive: NguardIsbnDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardIsbnDirective, '<div nguardIsbn></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate an ISBN-10', () => {
        control = createAbstractControlSpy('0-306-40615-2');

        expect(directive.validate(control)).toBeNull();
    });

    it('should validate an ISBN-13', () => {
        control = createAbstractControlSpy('9780306406157');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail an invalid ISBN', () => {
        control = createAbstractControlSpy('0306406153');

        expect(directive.validate(control)).toEqual({ isbn: true });
    });
});
