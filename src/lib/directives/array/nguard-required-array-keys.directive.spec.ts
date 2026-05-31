import { AbstractControl } from '@angular/forms';
import { NguardRequiredArrayKeysDirective } from './nguard-required-array-keys.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

describe('NguardRequiredArrayKeysDirective', () => {
    let control: AbstractControl;
    let directive: NguardRequiredArrayKeysDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardRequiredArrayKeysDirective,
            '<div [nguardRequiredArrayKeys]="$any(value)"></div>',
            ['id', 'name']
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should validate when the object has all required keys', () => {
        control = createAbstractControlSpy({ id: 1, name: 'x' });

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail when a required key is missing', () => {
        control = createAbstractControlSpy({ id: 1 });

        expect(directive.validate(control)).toEqual({ requiredArrayKeys: true });
    });
});
