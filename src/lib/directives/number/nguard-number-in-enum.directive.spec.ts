import { AbstractControl } from '@angular/forms';
import { NguardNumberInEnumDirective } from './nguard-number-in-enum.directive';
import { createAbstractControlSpy, createDirectiveFixture } from '../../utils/test.utils';

enum Priority {
    Low = 1,
    High = 5,
}

describe('NguardNumberInEnumDirective', () => {
    let control: AbstractControl;
    let directive: NguardNumberInEnumDirective;

    beforeEach(() => {
        ({ directive } = createDirectiveFixture(
            NguardNumberInEnumDirective,
            '<div [nguardNumberInEnum]="$any(value)"></div>',
            Priority
        ));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass when the value is a numeric enum value', () => {
        control = createAbstractControlSpy(5);

        expect(directive.validate(control)).toBeNull();
    });

    it('should fail for a reverse-mapping key value', () => {
        control = createAbstractControlSpy(3);

        expect(directive.validate(control)).toEqual({ inEnum: true });
    });
});
