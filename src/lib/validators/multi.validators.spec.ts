import { AbstractControl } from "@angular/forms";
import { createAbstractControlSpy, createAbstractControlSpyWithSibling } from "../utils/test.utils";
import { MultiValidators } from "./multi.validators";

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
        expect(MultiValidators.different('', true)(control)).toEqual({different: true});
    });

    it('Different Validator - Invalid if values are equal with different type (strict disabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        expect(MultiValidators.different('')(control)).toEqual({different: true});
    });
});

describe('Multi Validators - Doesnt End With', () => {
    it('Doesnt End With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(MultiValidators.doesntEndWith('Angular')(control)).toBeNull();
    });

    it('Doesnt End With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(MultiValidators.doesntEndWith('Library')(control)).toEqual({doesntEndWith: true});
    });

    it('Doesnt End With - Valid with mixed types', () => {
        control = createAbstractControlSpy('2024');
        expect(MultiValidators.doesntEndWith(20)(control)).toBeNull();
    });

    it('Doesnt End With - Invalid with mixed types', () => {
        control = createAbstractControlSpy('2024');
        expect(MultiValidators.doesntEndWith(24)(control)).toEqual({doesntEndWith: true});
    });
});

describe('Multi Validators - Doesnt Start With', () => {
    it('Doesnt Start With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(MultiValidators.doesntStartWith('Angular')(control)).toBeNull();
    });

    it('Doesnt Start With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(MultiValidators.doesntStartWith('nguard')(control)).toEqual({doesntStartWith: true});
    });

    it('Doesnt Start With - Valid with mixed types', () => {
        control = createAbstractControlSpy('2024');
        expect(MultiValidators.doesntStartWith(24)(control)).toBeNull();
    });

    it('Doesnt Start With - Invalid with mixed types', () => {
        control = createAbstractControlSpy('2024');
        expect(MultiValidators.doesntStartWith(20)(control)).toEqual({doesntStartWith: true});
    });
});

describe('Multi Validators - Ends With', () => {
    it('Ends With - Valid', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(MultiValidators.endsWith('library')(control)).toBeNull();
    });

    it('Ends With - Invalid (check case insensitive)', () => {
        control = createAbstractControlSpy('nGuard is an Angular library');
        expect(MultiValidators.endsWith('nGuard', 'an')(control)).toEqual({endsWith: true});
    });

    it('Ends With - Valid if a number ends with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);
        expect(MultiValidators.endsWith('24')(control)).toBeNull();
    });

    it('Ends With - Invalid if a number doesnt end with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);
        expect(MultiValidators.endsWith('20')(control)).toEqual({endsWith: true});
    });

    it('Ends With - Valid if a boolean ends with the string ue (from true)', () => {
        control = createAbstractControlSpy(true);
        expect(MultiValidators.endsWith('ue')(control)).toBeNull();
    });

    it('Ends With - Invalid if a boolean ends with the character 1', () => {
        control = createAbstractControlSpy(true);
        expect(MultiValidators.endsWith('1')(control)).toEqual({endsWith: true});
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
        expect(MultiValidators.requiredIf('key')(control)).toEqual({requiredIf: true});
    });

    it('Required If - Invalid if the given field is set but the current field is not set', () => {
        control = createAbstractControlSpyWithSibling('', 'value');
        expect(MultiValidators.requiredIf('key')(control)).toEqual({requiredIf: true});
    });

    it('Required If - Invalid if the given field is set but doesnt match the given value (non strict)', () => {
        control = createAbstractControlSpyWithSibling('value', 'value');
        expect(MultiValidators.requiredIf('key', 'none')(control)).toEqual({requiredIf: true});
    });

    it('Required If - Invalid if the given field is set but doesnt match the given value (strict)', () => {
        control = createAbstractControlSpyWithSibling('value', '1');
        expect(MultiValidators.requiredIf('key', 1, true)(control)).toEqual({requiredIf: true});
    });
});

describe('Multi Validators - Same', () => {
    it('Same - Valid if both fields have the same value', () => {
        control = createAbstractControlSpyWithSibling('abc', 'abc');
        expect(MultiValidators.same('')(control)).toBeNull();
    });

    it('Same - Invalid if fields have different values', () => {
        control = createAbstractControlSpyWithSibling('abc', 'def');
        expect(MultiValidators.same('')(control)).toEqual({same: true});
    });

    it('Same Validator - Invalid if values are equal with different type (strict enabled)', () => {
        control = createAbstractControlSpyWithSibling('1', 1);
        expect(MultiValidators.same('', true)(control)).toEqual({same: true});
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
        expect(MultiValidators.startsWith('is', 'an')(control)).toEqual({startsWith: true});
    });

    it('Starts With - Valid if a number starts with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);
        expect(MultiValidators.startsWith('20')(control)).toBeNull();
    });

    it('Starts With - Invalid if a number doesnt start with the digits in a given string', () => {
        control = createAbstractControlSpy(2024);
        expect(MultiValidators.startsWith('24')(control)).toEqual({startsWith: true});
    });

    it('Starts With - Valid if a boolean starts with the string tr (from true)', () => {
        control = createAbstractControlSpy(true);
        expect(MultiValidators.startsWith('tr')(control)).toBeNull();
    });

    it('Starts With - Invalid if a boolean starts with the character 1', () => {
        control = createAbstractControlSpy(true);
        expect(MultiValidators.startsWith('1')(control)).toEqual({startsWith: true});
    });
});