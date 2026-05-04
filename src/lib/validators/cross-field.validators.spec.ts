import { AbstractControl } from '@angular/forms';
import {
    createAbstractControlSpyWithSibling,
    createOrphanControlSpy,
    createControlSpyWithNullSibling,
    createControlSpyWithUndefinedSibling,
} from '../utils/test.utils';
import { CrossFieldValidators } from './cross-field.validators';

let control: jasmine.SpyObj<AbstractControl>;

describe('CrossField Validators - Different', () => {
    it('Different Validator - Valid if values are different with same type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');

        expect(CrossFieldValidators.different('', true)(control)).toBeNull();
    });

    it('Different Validator - Valid if values are equal with different type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);

        expect(CrossFieldValidators.different('', true)(control)).toBeNull();
    });

    it('Different Validator - Invalid if values are equal with same type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');

        expect(CrossFieldValidators.different('', true)(control)).toEqual({ different: true });
    });

    it('Different Validator - Invalid if values are equal with different type (strict disabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);

        expect(CrossFieldValidators.different('')(control)).toEqual({ different: true });
    });
});

describe('CrossField Validators - Greater Than', () => {
    it('Greater Than - Valid (strings)', () => {
        control = createAbstractControlSpyWithSibling('nGuard is an Angular library', 'library');

        expect(CrossFieldValidators.greaterThan('')(control)).toBeNull();
    });

    it('Greater Than - Invalid (strings)', () => {
        control = createAbstractControlSpyWithSibling('library', 'nGuard is an Angular library');

        expect(CrossFieldValidators.greaterThan('nGuard')(control)).toEqual({ greaterThan: true });
    });

    it('Greater Than - Valid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(CrossFieldValidators.greaterThan('')(control)).toBeNull();
    });

    it('Greater Than - Invalid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(CrossFieldValidators.greaterThan('')(control)).toEqual({ greaterThan: true });
    });

    it('Greater Than - Invalid (types mismatch)', () => {
        control = createAbstractControlSpyWithSibling(70, '10');

        expect(CrossFieldValidators.greaterThan('')(control)).toEqual({ greaterThan: true });
    });
});

describe('CrossField Validators - Greater Than or Equal', () => {
    it('Greater Than or Equal - Valid (strings)', () => {
        control = createAbstractControlSpyWithSibling('nGuard is an Angular library', 'library');

        expect(CrossFieldValidators.greaterThanOrEqual('')(control)).toBeNull();
    });

    it('Greater Than or Equal - Valid (strings) - First is equal the second', () => {
        control = createAbstractControlSpyWithSibling('nGuard!', 'library');

        expect(CrossFieldValidators.greaterThanOrEqual('')(control)).toBeNull();
    });

    it('Greater Than or Equal - Invalid (strings) - First is less than the second', () => {
        control = createAbstractControlSpyWithSibling('library', 'nGuard is an Angular library');

        expect(CrossFieldValidators.greaterThanOrEqual('nGuard')(control)).toEqual({ greaterThanOrEqual: true });
    });

    it('Greater Than or Equal - Valid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(CrossFieldValidators.greaterThanOrEqual('')(control)).toBeNull();
    });

    it('Greater Than or Equal - Invalid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(CrossFieldValidators.greaterThanOrEqual('')(control)).toEqual({ greaterThanOrEqual: true });
    });

    it('Greater Than or Equal - Invalid (types mismatch)', () => {
        control = createAbstractControlSpyWithSibling(70, '10');

        expect(CrossFieldValidators.greaterThanOrEqual('')(control)).toEqual({ greaterThanOrEqual: true });
    });
});

describe('CrossField Validators - Lesser Than', () => {
    it('Lesser Than - Valid (strings)', () => {
        control = createAbstractControlSpyWithSibling('library', 'nGuard is an Angular library');

        expect(CrossFieldValidators.lesserThan('')(control)).toBeNull();
    });

    it('Lesser Than - Invalid (strings)', () => {
        control = createAbstractControlSpyWithSibling('nGuard is an Angular library', 'library');

        expect(CrossFieldValidators.lesserThan('nGuard')(control)).toEqual({ lesserThan: true });
    });

    it('Lesser Than - Valid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(CrossFieldValidators.lesserThan('')(control)).toBeNull();
    });

    it('Lesser Than - Invalid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(CrossFieldValidators.lesserThan('')(control)).toEqual({ lesserThan: true });
    });

    it('Lesser Than - Invalid (types mismatch)', () => {
        control = createAbstractControlSpyWithSibling(70, '10');

        expect(CrossFieldValidators.lesserThan('')(control)).toEqual({ lesserThan: true });
    });
});

describe('CrossField Validators - Lesser Than or Equal', () => {
    it('Lesser Than or Equal - Valid (strings) - First is less than the second', () => {
        control = createAbstractControlSpyWithSibling('library', 'nGuard is an Angular library');

        expect(CrossFieldValidators.lesserThanOrEqual('')(control)).toBeNull();
    });

    it('Lesser Than or Equal - Valid (strings) - First is equal the second', () => {
        control = createAbstractControlSpyWithSibling('library', 'nGuard!');

        expect(CrossFieldValidators.lesserThanOrEqual('')(control)).toBeNull();
    });

    it('Lesser Than or Equal - Invalid (strings)', () => {
        control = createAbstractControlSpyWithSibling('nGuard is an Angular library', 'library');

        expect(CrossFieldValidators.lesserThanOrEqual('nGuard')(control)).toEqual({ lesserThanOrEqual: true });
    });

    it('Lesser Than or Equal - Valid (numbers) - First is less than the second', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(CrossFieldValidators.lesserThanOrEqual('')(control)).toBeNull();
    });

    it('Lesser Than or Equal - Valid (numbers) - First is equal the second', () => {
        control = createAbstractControlSpyWithSibling(10, 10);

        expect(CrossFieldValidators.lesserThanOrEqual('')(control)).toBeNull();
    });

    it('Lesser Than or Equal - Invalid (numbers)', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(CrossFieldValidators.lesserThanOrEqual('')(control)).toEqual({ lesserThanOrEqual: true });
    });

    it('Lesser Than or Equal - Invalid (types mismatch)', () => {
        control = createAbstractControlSpyWithSibling(70, '10');

        expect(CrossFieldValidators.lesserThanOrEqual('')(control)).toEqual({ lesserThanOrEqual: true });
    });
});

describe('CrossField Validators - Required If', () => {
    it('Required If - Valid if both fields are set', () => {
        control = createAbstractControlSpyWithSibling('value', 'value');

        expect(CrossFieldValidators.requiredIf('key')(control)).toBeNull();
    });

    it('Required If - Valid if both fields are set and the given value matches (non strict)', () => {
        control = createAbstractControlSpyWithSibling('value', 'value');

        expect(CrossFieldValidators.requiredIf('key', 'value')(control)).toBeNull();
    });

    it('Required If - Invalid if the given field is not set', () => {
        control = createAbstractControlSpyWithSibling('value', '');

        expect(CrossFieldValidators.requiredIf('key')(control)).toEqual({ requiredIf: true });
    });

    it('Required If - Invalid if the given field is set but the current field is not set', () => {
        control = createAbstractControlSpyWithSibling('', 'value');

        expect(CrossFieldValidators.requiredIf('key')(control)).toEqual({ requiredIf: true });
    });

    it('Required If - Invalid if the given field is set but doesnt match the given value (non strict)', () => {
        control = createAbstractControlSpyWithSibling('value', 'value');

        expect(CrossFieldValidators.requiredIf('key', 'none')(control)).toEqual({ requiredIf: true });
    });

    it('Required If - Invalid if the given field is set but doesnt match the given value (strict)', () => {
        control = createAbstractControlSpyWithSibling('value', '1');

        expect(CrossFieldValidators.requiredIf('key', 1, true)(control)).toEqual({ requiredIf: true });
    });
});

describe('CrossField Validators - Same', () => {
    it('Same - Valid if both fields have the same value', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');

        expect(CrossFieldValidators.same('')(control)).toBeNull();
    });

    it('Same - Invalid if fields have different values', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');

        expect(CrossFieldValidators.same('')(control)).toEqual({ same: true });
    });

    it('Same Validator - Invalid if values are equal with different type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);

        expect(CrossFieldValidators.same('', true)(control)).toEqual({ same: true });
    });

    it('Same Validator - Valid if values are equal with different type (strict disabled / implicit)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);

        expect(CrossFieldValidators.same('')(control)).toBeNull();
    });

    it('Same Validator - Valid if values are equal with different type (strict disabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);

        expect(CrossFieldValidators.same('', false)(control)).toBeNull();
    });
});

describe('CrossField Validators - Confirmed', () => {
    it('Confirmed - Valid when values match', () => {
        control = createAbstractControlSpyWithSibling('password123', 'password123');

        expect(CrossFieldValidators.confirmed('password')(control)).toBeNull();
    });

    it('Confirmed - Invalid when values do not match', () => {
        control = createAbstractControlSpyWithSibling('password123', 'password456');

        expect(CrossFieldValidators.confirmed('password')(control)).toEqual({ confirmed: true });
    });

    it('Confirmed - Invalid when types differ (strict comparison)', () => {
        control = createAbstractControlSpyWithSibling('123', 123);

        expect(CrossFieldValidators.confirmed('field')(control)).toEqual({ confirmed: true });
    });

    it('Confirmed - Invalid when original field is empty', () => {
        control = createAbstractControlSpyWithSibling('password123', '');

        expect(CrossFieldValidators.confirmed('password')(control)).toEqual({ confirmed: true });
    });

    it('Confirmed - Valid when both fields are empty', () => {
        control = createAbstractControlSpyWithSibling('', '');

        expect(CrossFieldValidators.confirmed('password')(control)).toBeNull();
    });

    it('Confirmed - Invalid when original field is null', () => {
        control = createControlSpyWithNullSibling('password123');

        expect(CrossFieldValidators.confirmed('password')(control)).toEqual({ confirmed: true });
    });

    it('Confirmed - Invalid when control has no parent', () => {
        control = createOrphanControlSpy('password123');

        expect(CrossFieldValidators.confirmed('password')(control)).toEqual({ confirmed: true });
    });
});

describe('CrossField Validators - Aliases', () => {
    it('gt - Should be an alias for greaterThan', () => {
        expect(CrossFieldValidators.gt).toBe(CrossFieldValidators.greaterThan);
    });

    it('gte - Should be an alias for greaterThanOrEqual', () => {
        expect(CrossFieldValidators.gte).toBe(CrossFieldValidators.greaterThanOrEqual);
    });

    it('lt - Should be an alias for lesserThan', () => {
        expect(CrossFieldValidators.lt).toBe(CrossFieldValidators.lesserThan);
    });

    it('lte - Should be an alias for lesserThanOrEqual', () => {
        expect(CrossFieldValidators.lte).toBe(CrossFieldValidators.lesserThanOrEqual);
    });

    it('gt - Works like greaterThan', () => {
        control = createAbstractControlSpyWithSibling(70, 10);

        expect(CrossFieldValidators.gt('')(control)).toBeNull();
    });

    it('gte - Works like greaterThanOrEqual', () => {
        control = createAbstractControlSpyWithSibling(10, 10);

        expect(CrossFieldValidators.gte('')(control)).toBeNull();
    });

    it('lt - Works like lesserThan', () => {
        control = createAbstractControlSpyWithSibling(10, 70);

        expect(CrossFieldValidators.lt('')(control)).toBeNull();
    });

    it('lte - Works like lesserThanOrEqual', () => {
        control = createAbstractControlSpyWithSibling(10, 10);

        expect(CrossFieldValidators.lte('')(control)).toBeNull();
    });
});

describe('CrossField Validators - Edge Cases', () => {
    describe('Null/Undefined sibling handling', () => {
        it('Different - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling('value');

            expect(CrossFieldValidators.different('key')(control)).toBeNull();
        });

        it('Different - Should handle undefined sibling value', () => {
            control = createControlSpyWithUndefinedSibling('value');

            expect(CrossFieldValidators.different('key')(control)).toBeNull();
        });

        it('Same - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling('value');

            expect(CrossFieldValidators.same('key')(control)).toEqual({ same: true });
        });

        it('Same - Should handle undefined sibling value', () => {
            control = createControlSpyWithUndefinedSibling('value');

            expect(CrossFieldValidators.same('key')(control)).toEqual({ same: true });
        });

        it('GreaterThan - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling(100);

            expect(CrossFieldValidators.greaterThan('key')(control)).toEqual({ greaterThan: true });
        });

        it('LesserThan - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling(100);

            expect(CrossFieldValidators.lesserThan('key')(control)).toEqual({ lesserThan: true });
        });

        it('RequiredIf - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling('value');

            expect(CrossFieldValidators.requiredIf('key')(control)).toEqual({ requiredIf: true });
        });
    });

    describe('Empty string handling', () => {
        it('Same - Should handle empty strings on both sides', () => {
            control = createAbstractControlSpyWithSibling('', '');

            expect(CrossFieldValidators.same('key')(control)).toBeNull();
        });

        it('Different - Should fail with empty strings on both sides', () => {
            control = createAbstractControlSpyWithSibling('', '');

            expect(CrossFieldValidators.different('key')(control)).toEqual({ different: true });
        });
    });

    describe('Orphan control handling (no parent)', () => {
        it('Different - Should handle control without parent', () => {
            control = createOrphanControlSpy('value');

            expect(CrossFieldValidators.different('key')(control)).toBeNull();
        });

        it('Same - Should handle control without parent', () => {
            control = createOrphanControlSpy('value');

            expect(CrossFieldValidators.same('key')(control)).toEqual({ same: true });
        });

        it('GreaterThan - Should handle control without parent', () => {
            control = createOrphanControlSpy(100);

            expect(CrossFieldValidators.greaterThan('key')(control)).toEqual({ greaterThan: true });
        });

        it('LesserThan - Should handle control without parent', () => {
            control = createOrphanControlSpy(100);

            expect(CrossFieldValidators.lesserThan('key')(control)).toEqual({ lesserThan: true });
        });

        it('RequiredIf - Should handle control without parent', () => {
            control = createOrphanControlSpy('value');

            expect(CrossFieldValidators.requiredIf('key')(control)).toEqual({ requiredIf: true });
        });
    });
});
