import { AbstractControl } from '@angular/forms';

/**
 * Creates a mock AbstractControl with the specified value
 * @param value The value to set on the control
 * @returns A Jasmine spy object mimicking AbstractControl
 */
export const createAbstractControlSpy = <T>(value: T) => jasmine.createSpyObj('AbstractControl', {}, { value });

/**
 * Creates a mock AbstractControl with null value
 * @returns A Jasmine spy object mimicking AbstractControl with null value
 */
export const createNullControlSpy = () => createAbstractControlSpy(null);

/**
 * Creates a mock AbstractControl with undefined value
 * @returns A Jasmine spy object mimicking AbstractControl with undefined value
 */
export const createUndefinedControlSpy = () => createAbstractControlSpy(undefined);

/**
 * Creates a mock AbstractControl with empty string value
 * @returns A Jasmine spy object mimicking AbstractControl with empty string value
 */
export const createEmptyStringControlSpy = () => createAbstractControlSpy('');

/**
 * Creates a mock AbstractControl with a sibling control in the parent FormGroup
 * Used for testing multi-field validators
 * @param field1Value The value of the main control
 * @param field2Value The value of the sibling control
 * @returns A Jasmine spy object mimicking AbstractControl with parent FormGroup
 */
export const createAbstractControlSpyWithSibling = (
    field1Value: any,
    field2Value: any
): jasmine.SpyObj<AbstractControl> => {
    const parent = jasmine.createSpyObj('FormGroup', ['get']);
    const control1 = jasmine.createSpyObj('FormControl', [], { value: field1Value, parent });
    const control2 = jasmine.createSpyObj('FormControl', [], { value: field2Value });

    parent.get.and.returnValue(control2);

    return control1;
};

/**
 * Creates a mock AbstractControl with a sibling that has null value
 * @param field1Value The value of the main control
 * @returns A Jasmine spy object mimicking AbstractControl with null sibling
 */
export const createControlSpyWithNullSibling = (field1Value: any): jasmine.SpyObj<AbstractControl> =>
    createAbstractControlSpyWithSibling(field1Value, null);

/**
 * Creates a mock AbstractControl with a sibling that has undefined value
 * @param field1Value The value of the main control
 * @returns A Jasmine spy object mimicking AbstractControl with undefined sibling
 */
export const createControlSpyWithUndefinedSibling = (field1Value: any): jasmine.SpyObj<AbstractControl> =>
    createAbstractControlSpyWithSibling(field1Value, undefined);

/**
 * Creates a mock AbstractControl with no parent (orphan control)
 * Used for testing validators that depend on parent FormGroup
 * @param value The value of the control
 * @returns A Jasmine spy object mimicking AbstractControl without parent
 */
export const createOrphanControlSpy = <T>(value: T): jasmine.SpyObj<AbstractControl> =>
    jasmine.createSpyObj('AbstractControl', {}, { value, parent: null });
