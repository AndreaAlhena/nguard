import { AbstractControl } from '@angular/forms';
import { NguardUlidDirective } from './nguard-ulid.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardUlidDirective', () => {
    let control: AbstractControl;
    let directive: NguardUlidDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(NguardUlidDirective, '<div nguardUlid></div>'));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate a well-formed ULID', () => {
        control = createAbstractControlSpy('01H8XGJWBWBAQ4N4S6EBT5T6XR');

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail on a malformed ULID', () => {
        control = createAbstractControlSpy('not-a-ulid');

        expect(directive.validate(control)).toEqual({ ulid: true });
    });
});
