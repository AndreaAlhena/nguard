import { AbstractControl } from '@angular/forms';
import {
    createAbstractControlSpy,
    createAbstractControlSpyWithSibling,
    createOrphanControlSpy,
    createControlSpyWithNullSibling,
    createControlSpyWithUndefinedSibling,
} from '../utils/test.utils';
import { MultiValidators } from './multi.validators';

let control: jasmine.SpyObj<AbstractControl>;

describe('Multi Validators - Different', () => {
    it('Different Validator - Valid if values are different with same type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');

        expect(MultiValidators.different('', true)(control)).toBeNull();
    });

    it('Different Validator - Valid if values are equal with different type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);

        expect(MultiValidators.different('', true)(control)).toBeNull();
    });

    it('Different Validator - Invalid if values are equal with same type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');

        expect(MultiValidators.different('', true)(control)).toEqual({ different: true });
    });

    it('Different Validator - Invalid if values are equal with different type (strict disabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);

        expect(MultiValidators.different('')(control)).toEqual({ different: true });
    });
});

describe('Multi Validators - Doesnt End With', () => {
    it('Doesnt End With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(MultiValidators.doesntEndWith('Angular')(control)).toBeNull();
    });

    it('Doesnt End With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(MultiValidators.doesntEndWith('Library')(control)).toEqual({ doesntEndWith: true });
    });

    it('Doesnt End With - Valid with mixed types', () => {
        control = createAbstractControlSpy('2024');

        expect(MultiValidators.doesntEndWith(20)(control)).toBeNull();
    });

    it('Doesnt End With - Invalid with mixed types', () => {
        control = createAbstractControlSpy('2024');

        expect(MultiValidators.doesntEndWith(24)(control)).toEqual({ doesntEndWith: true });
    });
});

describe('Multi Validators - Doesnt Start With', () => {
    it('Doesnt Start With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(MultiValidators.doesntStartWith('Angular')(control)).toBeNull();
    });

    it('Doesnt Start With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(MultiValidators.doesntStartWith('nguard')(control)).toEqual({ doesntStartWith: true });
    });

    it('Doesnt Start With - Valid with mixed types', () => {
        control = createAbstractControlSpy('2024');

        expect(MultiValidators.doesntStartWith(24)(control)).toBeNull();
    });

    it('Doesnt Start With - Invalid with mixed types', () => {
        control = createAbstractControlSpy('2024');

        expect(MultiValidators.doesntStartWith(20)(control)).toEqual({ doesntStartWith: true });
    });
});

describe('Multi Validators - Ends With', () => {
    it('Ends With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(MultiValidators.endsWith('library')(control)).toBeNull();
    });

    it('Ends With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(MultiValidators.endsWith('nGuard', 'an')(control)).toEqual({ endsWith: true });
    });

    it('Ends With - Valid if a number ends with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);

        expect(MultiValidators.endsWith('24')(control)).toBeNull();
    });

    it('Ends With - Invalid if a number doesnt end with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);

        expect(MultiValidators.endsWith('20')(control)).toEqual({ endsWith: true });
    });

    it('Ends With - Valid if a boolean ends with the string ue (from true)', () => {
        control = createAbstractControlSpy(true);

        expect(MultiValidators.endsWith('ue')(control)).toBeNull();
    });

    it('Ends With - Invalid if a boolean ends with the character 1', () => {
        control = createAbstractControlSpy(true);

        expect(MultiValidators.endsWith('1')(control)).toEqual({ endsWith: true });
    });
});

describe('Multi Validators - Greater Than', () => {
    it('Greater Than - Valid (strings)', () => {
        control = createAbstractControlSpyWithSibling('nGuard is an Angular library', 'library');

        expect(MultiValidators.greaterThan('')(control)).toBeNull();
    });

    it('Greater Than - Invalid (strings)', () => {
        control = createAbstractControlSpyWithSibling('library', 'nGuard is an Angular library');

        expect(MultiValidators.greaterThan('nGuard')(control)).toEqual({ greaterThan: true });
    });

    it('Greater Than - Valid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(MultiValidators.greaterThan('')(control)).toBeNull();
    });

    it('Greater Than - Invalid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(MultiValidators.greaterThan('')(control)).toEqual({ greaterThan: true });
    });

    it('Greater Than - Invalid (types mismatch)', () => {
        control = createAbstractControlSpyWithSibling(70, '10');

        expect(MultiValidators.greaterThan('')(control)).toEqual({ greaterThan: true });
    });
});

describe('Multi Validators - Greater Than or Equal', () => {
    it('Greater Than or Equal - Valid (strings)', () => {
        control = createAbstractControlSpyWithSibling('nGuard is an Angular library', 'library');

        expect(MultiValidators.greaterThanOrEqual('')(control)).toBeNull();
    });

    it('Greater Than or Equal - Valid (strings) - First is equal the second', () => {
        control = createAbstractControlSpyWithSibling('nGuard!', 'library');

        expect(MultiValidators.greaterThanOrEqual('')(control)).toBeNull();
    });

    it('Greater Than or Equal - Invalid (strings) - First is less than the second', () => {
        control = createAbstractControlSpyWithSibling('library', 'nGuard is an Angular library');

        expect(MultiValidators.greaterThanOrEqual('nGuard')(control)).toEqual({ greaterThanOrEqual: true });
    });

    it('Greater Than or Equal - Valid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(MultiValidators.greaterThanOrEqual('')(control)).toBeNull();
    });

    it('Greater Than or Equal - Invalid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(MultiValidators.greaterThanOrEqual('')(control)).toEqual({ greaterThanOrEqual: true });
    });

    it('Greater Than or Equal - Invalid (types mismatch)', () => {
        control = createAbstractControlSpyWithSibling(70, '10');

        expect(MultiValidators.greaterThanOrEqual('')(control)).toEqual({ greaterThanOrEqual: true });
    });
});

describe('Multi Validators - Lesser Than', () => {
    it('Lesser Than - Valid (strings)', () => {
        control = createAbstractControlSpyWithSibling('library', 'nGuard is an Angular library');

        expect(MultiValidators.lesserThan('')(control)).toBeNull();
    });

    it('Lesser Than - Invalid (strings)', () => {
        control = createAbstractControlSpyWithSibling('nGuard is an Angular library', 'library');

        expect(MultiValidators.lesserThan('nGuard')(control)).toEqual({ lesserThan: true });
    });

    it('Lesser Than - Valid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(MultiValidators.lesserThan('')(control)).toBeNull();
    });

    it('Lesser Than - Invalid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(MultiValidators.lesserThan('')(control)).toEqual({ lesserThan: true });
    });

    it('Lesser Than - Invalid (types mismatch)', () => {
        control = createAbstractControlSpyWithSibling(70, '10');

        expect(MultiValidators.lesserThan('')(control)).toEqual({ lesserThan: true });
    });
});

describe('Multi Validators - Lesser Than or Equal', () => {
    it('Lesser Than or Equal - Valid (strings) - First is less than the second', () => {
        control = createAbstractControlSpyWithSibling('library', 'nGuard is an Angular library');

        expect(MultiValidators.lesserThanOrEqual('')(control)).toBeNull();
    });

    it('Lesser Than or Equal - Valid (strings) - First is equal the second', () => {
        control = createAbstractControlSpyWithSibling('library', 'nGuard!');

        expect(MultiValidators.lesserThanOrEqual('')(control)).toBeNull();
    });

    it('Lesser Than or Equal - Invalid (strings)', () => {
        control = createAbstractControlSpyWithSibling('nGuard is an Angular library', 'library');

        expect(MultiValidators.lesserThanOrEqual('nGuard')(control)).toEqual({ lesserThanOrEqual: true });
    });

    it('Lesser Than or Equal - Valid (numbers) - First is less than the second', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(MultiValidators.lesserThanOrEqual('')(control)).toBeNull();
    });

    it('Lesser Than or Equal - Valid (numbers) - First is equal the second', () => {
        control = createAbstractControlSpyWithSibling(10, 10);

        expect(MultiValidators.lesserThanOrEqual('')(control)).toBeNull();
    });

    it('Lesser Than or Equal - Invalid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(MultiValidators.lesserThanOrEqual('')(control)).toEqual({ lesserThanOrEqual: true });
    });

    it('Lesser Than or Equal - Invalid (types mismatch)', () => {
        control = createAbstractControlSpyWithSibling(70, '10');

        expect(MultiValidators.lesserThanOrEqual('')(control)).toEqual({ lesserThanOrEqual: true });
    });
});

describe('Multi Validators - Required If', () => {
    it('Required If - Valid if both fields are set', () => {
        control = createAbstractControlSpyWithSibling('value', 'value');

        expect(MultiValidators.requiredIf('key')(control)).toBeNull();
    });

    it('Required If - Valid if both fields are set and the given value matches (non strict)', () => {
        control = createAbstractControlSpyWithSibling('value', 'value');

        expect(MultiValidators.requiredIf('key', 'value')(control)).toBeNull();
    });

    it('Required If - Invalid if the given field is not set', () => {
        control = createAbstractControlSpyWithSibling('value', '');

        expect(MultiValidators.requiredIf('key')(control)).toEqual({ requiredIf: true });
    });

    it('Required If - Invalid if the given field is set but the current field is not set', () => {
        control = createAbstractControlSpyWithSibling('', 'value');

        expect(MultiValidators.requiredIf('key')(control)).toEqual({ requiredIf: true });
    });

    it('Required If - Invalid if the given field is set but doesnt match the given value (non strict)', () => {
        control = createAbstractControlSpyWithSibling('value', 'value');

        expect(MultiValidators.requiredIf('key', 'none')(control)).toEqual({ requiredIf: true });
    });

    it('Required If - Invalid if the given field is set but doesnt match the given value (strict)', () => {
        control = createAbstractControlSpyWithSibling('value', '1');

        expect(MultiValidators.requiredIf('key', 1, true)(control)).toEqual({ requiredIf: true });
    });
});

describe('Multi Validators - Same', () => {
    it('Same - Valid if both fields have the same value', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');

        expect(MultiValidators.same('')(control)).toBeNull();
    });

    it('Same - Invalid if fields have different values', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');

        expect(MultiValidators.same('')(control)).toEqual({ same: true });
    });

    it('Same Validator - Invalid if values are equal with different type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);

        expect(MultiValidators.same('', true)(control)).toEqual({ same: true });
    });

    it('Same Validator - Valid if values are equal with different type (strict disabled / implicit)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);

        expect(MultiValidators.same('')(control)).toBeNull();
    });

    it('Same Validator - Valid if values are equal with different type (strict disabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);

        expect(MultiValidators.same('', false)(control)).toBeNull();
    });
});

describe('Multi Validators - Starts With', () => {
    it('Starts With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(MultiValidators.startsWith('angular', 'nguard')(control)).toBeNull();
    });

    it('Starts With - Invalid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');

        expect(MultiValidators.startsWith('is', 'an')(control)).toEqual({ startsWith: true });
    });

    it('Starts With - Valid if a number starts with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);

        expect(MultiValidators.startsWith('20')(control)).toBeNull();
    });

    it('Starts With - Invalid if a number doesnt start with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);

        expect(MultiValidators.startsWith('24')(control)).toEqual({ startsWith: true });
    });

    it('Starts With - Valid if a boolean starts with the string tr (from true)', () => {
        control = createAbstractControlSpy(true);

        expect(MultiValidators.startsWith('tr')(control)).toBeNull();
    });

    it('Starts With - Invalid if a boolean starts with the character 1', () => {
        control = createAbstractControlSpy(true);

        expect(MultiValidators.startsWith('1')(control)).toEqual({ startsWith: true });
    });
});

describe('Multi Validators - Edge Cases', () => {
    describe('Null/Undefined sibling handling', () => {
        it('Different - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling('value');

            expect(MultiValidators.different('key')(control)).toBeNull();
        });

        it('Different - Should handle undefined sibling value', () => {
            control = createControlSpyWithUndefinedSibling('value');

            expect(MultiValidators.different('key')(control)).toBeNull();
        });

        it('Same - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling('value');

            expect(MultiValidators.same('key')(control)).toEqual({ same: true });
        });

        it('Same - Should handle undefined sibling value', () => {
            control = createControlSpyWithUndefinedSibling('value');

            expect(MultiValidators.same('key')(control)).toEqual({ same: true });
        });

        it('GreaterThan - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling(100);

            expect(MultiValidators.greaterThan('key')(control)).toEqual({ greaterThan: true });
        });

        it('LesserThan - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling(100);

            expect(MultiValidators.lesserThan('key')(control)).toEqual({ lesserThan: true });
        });

        it('RequiredIf - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling('value');

            expect(MultiValidators.requiredIf('key')(control)).toEqual({ requiredIf: true });
        });
    });

    describe('Null/Undefined control value handling', () => {
        it('StartsWith - Should handle null control value', () => {
            control = createAbstractControlSpy(null);

            expect(MultiValidators.startsWith('test')(control)).toEqual({ startsWith: true });
        });

        it('StartsWith - Should handle undefined control value', () => {
            control = createAbstractControlSpy(undefined);

            expect(MultiValidators.startsWith('test')(control)).toEqual({ startsWith: true });
        });

        it('EndsWith - Should handle null control value', () => {
            control = createAbstractControlSpy(null);

            expect(MultiValidators.endsWith('test')(control)).toEqual({ endsWith: true });
        });

        it('EndsWith - Should handle undefined control value', () => {
            control = createAbstractControlSpy(undefined);

            expect(MultiValidators.endsWith('test')(control)).toEqual({ endsWith: true });
        });

        it('DoesntStartWith - Should handle null control value', () => {
            control = createAbstractControlSpy(null);

            expect(MultiValidators.doesntStartWith('test')(control)).toBeNull();
        });

        it('DoesntEndWith - Should handle null control value', () => {
            control = createAbstractControlSpy(null);

            expect(MultiValidators.doesntEndWith('test')(control)).toBeNull();
        });
    });

    describe('Empty string handling', () => {
        it('StartsWith - Should handle empty string control value', () => {
            control = createAbstractControlSpy('');

            expect(MultiValidators.startsWith('test')(control)).toEqual({ startsWith: true });
        });

        it('EndsWith - Should handle empty string control value', () => {
            control = createAbstractControlSpy('');

            expect(MultiValidators.endsWith('test')(control)).toEqual({ endsWith: true });
        });

        it('DoesntStartWith - Should pass with empty string control value', () => {
            control = createAbstractControlSpy('');

            expect(MultiValidators.doesntStartWith('test')(control)).toBeNull();
        });

        it('DoesntEndWith - Should pass with empty string control value', () => {
            control = createAbstractControlSpy('');

            expect(MultiValidators.doesntEndWith('test')(control)).toBeNull();
        });

        it('Same - Should handle empty strings on both sides', () => {
            control = createAbstractControlSpyWithSibling('', '');

            expect(MultiValidators.same('key')(control)).toBeNull();
        });

        it('Different - Should fail with empty strings on both sides', () => {
            control = createAbstractControlSpyWithSibling('', '');

            expect(MultiValidators.different('key')(control)).toEqual({ different: true });
        });
    });

    describe('Empty variadic args handling', () => {
        it('StartsWith - Should fail with no arguments', () => {
            control = createAbstractControlSpy('test');

            expect(MultiValidators.startsWith()(control)).toEqual({ startsWith: true });
        });

        it('EndsWith - Should fail with no arguments', () => {
            control = createAbstractControlSpy('test');

            expect(MultiValidators.endsWith()(control)).toEqual({ endsWith: true });
        });

        it('DoesntStartWith - Should pass with no arguments', () => {
            control = createAbstractControlSpy('test');

            expect(MultiValidators.doesntStartWith()(control)).toBeNull();
        });

        it('DoesntEndWith - Should pass with no arguments', () => {
            control = createAbstractControlSpy('test');

            expect(MultiValidators.doesntEndWith()(control)).toBeNull();
        });
    });

    describe('Orphan control handling (no parent)', () => {
        it('Different - Should handle control without parent', () => {
            control = createOrphanControlSpy('value');

            expect(MultiValidators.different('key')(control)).toBeNull();
        });

        it('Same - Should handle control without parent', () => {
            control = createOrphanControlSpy('value');

            expect(MultiValidators.same('key')(control)).toEqual({ same: true });
        });

        it('GreaterThan - Should handle control without parent', () => {
            control = createOrphanControlSpy(100);

            expect(MultiValidators.greaterThan('key')(control)).toEqual({ greaterThan: true });
        });

        it('LesserThan - Should handle control without parent', () => {
            control = createOrphanControlSpy(100);

            expect(MultiValidators.lesserThan('key')(control)).toEqual({ lesserThan: true });
        });

        it('RequiredIf - Should handle control without parent', () => {
            control = createOrphanControlSpy('value');

            expect(MultiValidators.requiredIf('key')(control)).toEqual({ requiredIf: true });
        });
    });
});
