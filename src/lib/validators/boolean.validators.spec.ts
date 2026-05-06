import { AbstractControl } from '@angular/forms';
import {
    createAbstractControlSpy,
    createAbstractControlSpyWithSibling,
    createNullControlSpy,
    createUndefinedControlSpy,
} from '../utils/test.utils';
import { BooleanValidators } from './boolean.validators';

let control: jasmine.SpyObj<AbstractControl>;

describe('Boolean Validators - accepted (Laravel parity)', () => {
    it('Accepted - Valid for the literal true', () => {
        control = createAbstractControlSpy(true);

        expect(BooleanValidators.accepted(control)).toBeNull();
    });

    it('Accepted - Valid for the string "true"', () => {
        control = createAbstractControlSpy('true');

        expect(BooleanValidators.accepted(control)).toBeNull();
    });

    it('Accepted - Valid for the number 1', () => {
        control = createAbstractControlSpy(1);

        expect(BooleanValidators.accepted(control)).toBeNull();
    });

    it('Accepted - Valid for the string "1"', () => {
        control = createAbstractControlSpy('1');

        expect(BooleanValidators.accepted(control)).toBeNull();
    });

    it('Accepted - Valid for the string "yes"', () => {
        control = createAbstractControlSpy('yes');

        expect(BooleanValidators.accepted(control)).toBeNull();
    });

    it('Accepted - Valid for the string "on"', () => {
        control = createAbstractControlSpy('on');

        expect(BooleanValidators.accepted(control)).toBeNull();
    });

    it('Accepted - Invalid for the literal false', () => {
        control = createAbstractControlSpy(false);

        expect(BooleanValidators.accepted(control)).toEqual({ accepted: true });
    });

    it('Accepted - Invalid for the string "Yes" with different case', () => {
        control = createAbstractControlSpy('Yes');

        expect(BooleanValidators.accepted(control)).toEqual({ accepted: true });
    });

    it('Accepted - Invalid for the number 2', () => {
        control = createAbstractControlSpy(2);

        expect(BooleanValidators.accepted(control)).toEqual({ accepted: true });
    });

    it('Accepted - Invalid for null', () => {
        control = createNullControlSpy();

        expect(BooleanValidators.accepted(control)).toEqual({ accepted: true });
    });
});

describe('Boolean Validators - acceptedIf', () => {
    it('AcceptedIf - Valid when condition is not met regardless of value', () => {
        control = createAbstractControlSpyWithSibling(false, '');

        expect(BooleanValidators.acceptedIf('key')(control)).toBeNull();
    });

    it('AcceptedIf - Valid when sibling is truthy and value is accepted', () => {
        control = createAbstractControlSpyWithSibling('yes', 'sibling');

        expect(BooleanValidators.acceptedIf('key')(control)).toBeNull();
    });

    it('AcceptedIf - Invalid when sibling is truthy and value is not accepted', () => {
        control = createAbstractControlSpyWithSibling(false, 'sibling');

        expect(BooleanValidators.acceptedIf('key')(control)).toEqual({ acceptedIf: true });
    });

    it('AcceptedIf - Valid when sibling matches trigger value and value is accepted', () => {
        control = createAbstractControlSpyWithSibling(true, 'pro');

        expect(BooleanValidators.acceptedIf('key', 'pro')(control)).toBeNull();
    });

    it('AcceptedIf - Invalid when sibling matches trigger value but value is not accepted', () => {
        control = createAbstractControlSpyWithSibling('Yes', 'pro');

        expect(BooleanValidators.acceptedIf('key', 'pro')(control)).toEqual({ acceptedIf: true });
    });

    it('AcceptedIf - Valid when sibling does not match trigger under strict comparison', () => {
        control = createAbstractControlSpyWithSibling(false, '1');

        expect(BooleanValidators.acceptedIf('key', 1, true)(control)).toBeNull();
    });
});

describe('Boolean Validators - boolean (Laravel parity)', () => {
    it('Boolean - Valid for the literal true', () => {
        control = createAbstractControlSpy(true);

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Valid for the literal false', () => {
        control = createAbstractControlSpy(false);

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Valid for the number 1', () => {
        control = createAbstractControlSpy(1);

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Valid for the number 0', () => {
        control = createAbstractControlSpy(0);

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Valid for the string "1"', () => {
        control = createAbstractControlSpy('1');

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Valid for the string "0"', () => {
        control = createAbstractControlSpy('0');

        expect(BooleanValidators.boolean(control)).toBeNull();
    });

    it('Boolean - Invalid for the string "true"', () => {
        control = createAbstractControlSpy('true');

        expect(BooleanValidators.boolean(control)).toEqual({ boolean: true });
    });

    it('Boolean - Invalid for the number 2', () => {
        control = createAbstractControlSpy(2);

        expect(BooleanValidators.boolean(control)).toEqual({ boolean: true });
    });

    it('Boolean - Invalid for null', () => {
        control = createNullControlSpy();

        expect(BooleanValidators.boolean(control)).toEqual({ boolean: true });
    });

    it('Boolean - Invalid for undefined', () => {
        control = createUndefinedControlSpy();

        expect(BooleanValidators.boolean(control)).toEqual({ boolean: true });
    });
});

describe('Boolean Validators - declined (Laravel parity)', () => {
    it('Declined - Valid for the literal false', () => {
        control = createAbstractControlSpy(false);

        expect(BooleanValidators.declined(control)).toBeNull();
    });

    it('Declined - Valid for the string "false"', () => {
        control = createAbstractControlSpy('false');

        expect(BooleanValidators.declined(control)).toBeNull();
    });

    it('Declined - Valid for the number 0', () => {
        control = createAbstractControlSpy(0);

        expect(BooleanValidators.declined(control)).toBeNull();
    });

    it('Declined - Valid for the string "0"', () => {
        control = createAbstractControlSpy('0');

        expect(BooleanValidators.declined(control)).toBeNull();
    });

    it('Declined - Valid for the string "no"', () => {
        control = createAbstractControlSpy('no');

        expect(BooleanValidators.declined(control)).toBeNull();
    });

    it('Declined - Valid for the string "off"', () => {
        control = createAbstractControlSpy('off');

        expect(BooleanValidators.declined(control)).toBeNull();
    });

    it('Declined - Invalid for the literal true', () => {
        control = createAbstractControlSpy(true);

        expect(BooleanValidators.declined(control)).toEqual({ declined: true });
    });

    it('Declined - Invalid for the string "No" with different case', () => {
        control = createAbstractControlSpy('No');

        expect(BooleanValidators.declined(control)).toEqual({ declined: true });
    });

    it('Declined - Invalid for the empty string', () => {
        control = createAbstractControlSpy('');

        expect(BooleanValidators.declined(control)).toEqual({ declined: true });
    });

    it('Declined - Invalid for null', () => {
        control = createNullControlSpy();

        expect(BooleanValidators.declined(control)).toEqual({ declined: true });
    });
});

describe('Boolean Validators - declinedIf', () => {
    it('DeclinedIf - Valid when condition is not met regardless of value', () => {
        control = createAbstractControlSpyWithSibling(true, '');

        expect(BooleanValidators.declinedIf('key')(control)).toBeNull();
    });

    it('DeclinedIf - Valid when sibling is truthy and value is declined', () => {
        control = createAbstractControlSpyWithSibling('no', 'sibling');

        expect(BooleanValidators.declinedIf('key')(control)).toBeNull();
    });

    it('DeclinedIf - Invalid when sibling is truthy and value is not declined', () => {
        control = createAbstractControlSpyWithSibling(true, 'sibling');

        expect(BooleanValidators.declinedIf('key')(control)).toEqual({ declinedIf: true });
    });

    it('DeclinedIf - Valid when sibling matches trigger value and value is declined', () => {
        control = createAbstractControlSpyWithSibling(false, 'guest');

        expect(BooleanValidators.declinedIf('key', 'guest')(control)).toBeNull();
    });

    it('DeclinedIf - Invalid when sibling matches trigger value but value is not declined', () => {
        control = createAbstractControlSpyWithSibling('No', 'guest');

        expect(BooleanValidators.declinedIf('key', 'guest')(control)).toEqual({ declinedIf: true });
    });

    it('DeclinedIf - Valid when sibling does not match trigger under strict comparison', () => {
        control = createAbstractControlSpyWithSibling(true, '1');

        expect(BooleanValidators.declinedIf('key', 1, true)(control)).toBeNull();
    });
});

describe('Boolean Validators - falsy', () => {
    it('Falsy - Valid for false', () => {
        control = createAbstractControlSpy(false);

        expect(BooleanValidators.falsy(control)).toBeNull();
    });

    it('Falsy - Valid for the number zero', () => {
        control = createAbstractControlSpy(0);

        expect(BooleanValidators.falsy(control)).toBeNull();
    });

    it('Falsy - Valid for the empty string', () => {
        control = createAbstractControlSpy('');

        expect(BooleanValidators.falsy(control)).toBeNull();
    });

    it('Falsy - Valid for null', () => {
        control = createNullControlSpy();

        expect(BooleanValidators.falsy(control)).toBeNull();
    });

    it('Falsy - Valid for undefined', () => {
        control = createUndefinedControlSpy();

        expect(BooleanValidators.falsy(control)).toBeNull();
    });

    it('Falsy - Invalid for true', () => {
        control = createAbstractControlSpy(true);

        expect(BooleanValidators.falsy(control)).toEqual({ falsy: true });
    });

    it('Falsy - Invalid for a non empty string', () => {
        control = createAbstractControlSpy('hello');

        expect(BooleanValidators.falsy(control)).toEqual({ falsy: true });
    });

    it('Falsy - Invalid for a non zero number', () => {
        control = createAbstractControlSpy(42);

        expect(BooleanValidators.falsy(control)).toEqual({ falsy: true });
    });
});

describe('Boolean Validators - truthy', () => {
    it('Truthy - Valid for true', () => {
        control = createAbstractControlSpy(true);

        expect(BooleanValidators.truthy(control)).toBeNull();
    });

    it('Truthy - Valid for a non empty string', () => {
        control = createAbstractControlSpy('hello');

        expect(BooleanValidators.truthy(control)).toBeNull();
    });

    it('Truthy - Valid for a non zero number', () => {
        control = createAbstractControlSpy(42);

        expect(BooleanValidators.truthy(control)).toBeNull();
    });

    it('Truthy - Invalid for false', () => {
        control = createAbstractControlSpy(false);

        expect(BooleanValidators.truthy(control)).toEqual({ truthy: true });
    });

    it('Truthy - Invalid for the number zero', () => {
        control = createAbstractControlSpy(0);

        expect(BooleanValidators.truthy(control)).toEqual({ truthy: true });
    });

    it('Truthy - Invalid for the empty string', () => {
        control = createAbstractControlSpy('');

        expect(BooleanValidators.truthy(control)).toEqual({ truthy: true });
    });

    it('Truthy - Invalid for null', () => {
        control = createNullControlSpy();

        expect(BooleanValidators.truthy(control)).toEqual({ truthy: true });
    });

    it('Truthy - Invalid for undefined', () => {
        control = createUndefinedControlSpy();

        expect(BooleanValidators.truthy(control)).toEqual({ truthy: true });
    });
});
