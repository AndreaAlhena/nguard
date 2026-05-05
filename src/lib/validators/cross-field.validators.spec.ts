import { AbstractControl } from '@angular/forms';
import {
    createAbstractControlSpyWithSibling,
    createAbstractControlSpyWithSiblings,
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

describe('CrossField Validators - Required Unless', () => {
    it('Required Unless - Valid when sibling is truthy and bypasses the rule (no trigger value)', () => {
        control = createAbstractControlSpyWithSibling('', 'sibling');

        expect(CrossFieldValidators.requiredUnless('key')(control)).toBeNull();
    });

    it('Required Unless - Invalid when sibling is falsy and field is empty (no trigger value)', () => {
        control = createAbstractControlSpyWithSibling('', '');

        expect(CrossFieldValidators.requiredUnless('key')(control)).toEqual({ requiredUnless: true });
    });

    it('Required Unless - Valid when sibling is falsy but field is filled (no trigger value)', () => {
        control = createAbstractControlSpyWithSibling('value', '');

        expect(CrossFieldValidators.requiredUnless('key')(control)).toBeNull();
    });

    it('Required Unless - Valid when sibling matches trigger value and field is empty', () => {
        control = createAbstractControlSpyWithSibling('', 'US');

        expect(CrossFieldValidators.requiredUnless('key', 'US')(control)).toBeNull();
    });

    it('Required Unless - Invalid when sibling does not match trigger value and field is empty', () => {
        control = createAbstractControlSpyWithSibling('', 'CA');

        expect(CrossFieldValidators.requiredUnless('key', 'US')(control)).toEqual({ requiredUnless: true });
    });

    it('Required Unless - Valid when trigger matches under non strict comparison', () => {
        control = createAbstractControlSpyWithSibling('', '1');

        expect(CrossFieldValidators.requiredUnless('key', 1)(control)).toBeNull();
    });

    it('Required Unless - Invalid when trigger does not match under strict comparison', () => {
        control = createAbstractControlSpyWithSibling('', '1');

        expect(CrossFieldValidators.requiredUnless('key', 1, true)(control)).toEqual({ requiredUnless: true });
    });
});

describe('CrossField Validators - Required With', () => {
    it('Required With - Valid when no listed sibling is filled', () => {
        control = createAbstractControlSpyWithSiblings('', { phone: '', address: '' });

        expect(CrossFieldValidators.requiredWith('phone', 'address')(control)).toBeNull();
    });

    it('Required With - Invalid when any listed sibling is filled and field is empty', () => {
        control = createAbstractControlSpyWithSiblings('', { phone: '', address: '123 Main St' });

        expect(CrossFieldValidators.requiredWith('phone', 'address')(control)).toEqual({ requiredWith: true });
    });

    it('Required With - Valid when any listed sibling is filled but field is filled', () => {
        control = createAbstractControlSpyWithSiblings('value', { phone: 'x' });

        expect(CrossFieldValidators.requiredWith('phone', 'address')(control)).toBeNull();
    });

    it('Required With - Single field key behaves like requiredIf without trigger value', () => {
        control = createAbstractControlSpyWithSiblings('', { phone: 'x' });

        expect(CrossFieldValidators.requiredWith('phone')(control)).toEqual({ requiredWith: true });
    });

    it('Required With - Treats null sibling as not filled', () => {
        control = createAbstractControlSpyWithSiblings('', { phone: null });

        expect(CrossFieldValidators.requiredWith('phone')(control)).toBeNull();
    });

    it('Required With - Treats undefined sibling as not filled', () => {
        control = createAbstractControlSpyWithSiblings('', { phone: undefined });

        expect(CrossFieldValidators.requiredWith('phone')(control)).toBeNull();
    });

    it('Required With - Orphan control passes when field is filled', () => {
        control = createOrphanControlSpy('value');

        expect(CrossFieldValidators.requiredWith('phone')(control)).toBeNull();
    });

    it('Required With - Orphan control passes regardless when no parent (no triggers reachable)', () => {
        control = createOrphanControlSpy('');

        expect(CrossFieldValidators.requiredWith('phone')(control)).toBeNull();
    });
});

describe('CrossField Validators - Required Without', () => {
    it('Required Without - Valid when every listed sibling is filled', () => {
        control = createAbstractControlSpyWithSiblings('', { email: 'a@b.c', phone: 'x' });

        expect(CrossFieldValidators.requiredWithout('email', 'phone')(control)).toBeNull();
    });

    it('Required Without - Invalid when any listed sibling is empty and field is empty', () => {
        control = createAbstractControlSpyWithSiblings('', { email: '', phone: 'x' });

        expect(CrossFieldValidators.requiredWithout('email', 'phone')(control)).toEqual({ requiredWithout: true });
    });

    it('Required Without - Valid when any listed sibling is empty but field is filled', () => {
        control = createAbstractControlSpyWithSiblings('value', { email: '', phone: 'x' });

        expect(CrossFieldValidators.requiredWithout('email', 'phone')(control)).toBeNull();
    });

    it('Required Without - Treats null sibling as not filled and triggers the rule', () => {
        control = createAbstractControlSpyWithSiblings('', { email: null });

        expect(CrossFieldValidators.requiredWithout('email')(control)).toEqual({ requiredWithout: true });
    });

    it('Required Without - Orphan control triggers the rule and fails when field is empty', () => {
        control = createOrphanControlSpy('');

        expect(CrossFieldValidators.requiredWithout('email')(control)).toEqual({ requiredWithout: true });
    });

    it('Required Without - Orphan control passes when field is filled', () => {
        control = createOrphanControlSpy('value');

        expect(CrossFieldValidators.requiredWithout('email')(control)).toBeNull();
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

        it('RequiredIf - Should handle null sibling value', () => {
            control = createControlSpyWithNullSibling('value');

            expect(CrossFieldValidators.requiredIf('key')(control)).toEqual({ requiredIf: true });
        });

        it('RequiredUnless - Should require the field when sibling is null', () => {
            control = createControlSpyWithNullSibling('');

            expect(CrossFieldValidators.requiredUnless('key')(control)).toEqual({ requiredUnless: true });
        });

        it('RequiredUnless - Should require the field when sibling is undefined', () => {
            control = createControlSpyWithUndefinedSibling('');

            expect(CrossFieldValidators.requiredUnless('key')(control)).toEqual({ requiredUnless: true });
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

        it('RequiredIf - Should handle control without parent', () => {
            control = createOrphanControlSpy('value');

            expect(CrossFieldValidators.requiredIf('key')(control)).toEqual({ requiredIf: true });
        });

        it('RequiredUnless - Should require the field when control has no parent', () => {
            control = createOrphanControlSpy('');

            expect(CrossFieldValidators.requiredUnless('key')(control)).toEqual({ requiredUnless: true });
        });

        it('RequiredUnless - Should pass for orphan when field has a value', () => {
            control = createOrphanControlSpy('value');

            expect(CrossFieldValidators.requiredUnless('key')(control)).toBeNull();
        });
    });
});
