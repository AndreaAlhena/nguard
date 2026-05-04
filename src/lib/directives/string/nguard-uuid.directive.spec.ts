import { AbstractControl } from '@angular/forms';
import { NguardUuidDirective } from './nguard-uuid.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardUuidDirective', () => {
    let control: AbstractControl;
    let directive: NguardUuidDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardUuidDirective, '<div nguardUuid></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a v4 UUID', () => {
        control = createAbstractControlSpy('550e8400-e29b-41d4-a716-446655440000');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on a malformed UUID', () => {
        control = createAbstractControlSpy('not-a-uuid');

        expect(directive.validate(control)).toEqual({ uuid: true });
    });
});
