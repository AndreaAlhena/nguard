import type { AbstractControl, FormGroup } from '@angular/forms';

/**
 * Creates a mock AbstractControl with the specified value
 * @param value The value to set on the control
 * @returns A Jasmine spy object mimicking AbstractControl
 */
export const createAbstractControlSpy = <T>(
  value: T,
): jasmine.SpyObj<AbstractControl> =>
  jasmine.createSpyObj<AbstractControl>('AbstractControl', {}, { value });

/**
 * Creates a mock AbstractControl with null value
 * @returns A Jasmine spy object mimicking AbstractControl with null value
 */
export const createNullControlSpy = (): jasmine.SpyObj<AbstractControl> =>
  createAbstractControlSpy(null);

/**
 * Creates a mock AbstractControl with undefined value
 * @returns A Jasmine spy object mimicking AbstractControl with undefined value
 */
export const createUndefinedControlSpy = (): jasmine.SpyObj<AbstractControl> =>
  createAbstractControlSpy(undefined);

/**
 * Creates a mock AbstractControl with empty string value
 * @returns A Jasmine spy object mimicking AbstractControl with empty string value
 */
export const createEmptyStringControlSpy =
  (): jasmine.SpyObj<AbstractControl> => createAbstractControlSpy('');

/**
 * Creates a mock AbstractControl with a sibling control in the parent FormGroup
 * Used for testing multi-field validators
 * @param field1Value The value of the main control
 * @param field2Value The value of the sibling control
 * @returns A Jasmine spy object mimicking AbstractControl with parent FormGroup
 */
export const createAbstractControlSpyWithSibling = (
  field1Value: unknown,
  field2Value: unknown,
): jasmine.SpyObj<AbstractControl> => {
  const parent = jasmine.createSpyObj<FormGroup>('FormGroup', ['get']);
  const control1 = jasmine.createSpyObj<AbstractControl>('FormControl', [], {
    value: field1Value,
    parent,
  });
  const control2 = jasmine.createSpyObj<AbstractControl>('FormControl', [], {
    value: field2Value,
  });

  parent.get.and.returnValue(control2);

  return control1;
};

/**
 * Creates a mock AbstractControl whose parent FormGroup resolves a different sibling
 * value per key. Used by validators that read several siblings (requiredWith, requiredWithoutAll, ...).
 *
 * @param controlValue Value of the control under test
 * @param siblings Map from sibling field key to that sibling's value
 * @returns A Jasmine spy object mimicking AbstractControl with a parent that responds per key
 */
export const createAbstractControlSpyWithSiblings = (
  controlValue: unknown,
  siblings: Record<string, unknown>,
): jasmine.SpyObj<AbstractControl> => {
  const parent = jasmine.createSpyObj<FormGroup>('FormGroup', ['get']);
  parent.get.and.callFake((key: string) =>
    key in siblings
      ? jasmine.createSpyObj<AbstractControl>('FormControl', [], {
          value: siblings[key],
        })
      : null,
  );

  return jasmine.createSpyObj<AbstractControl>(
    'AbstractControl',
    {},
    { value: controlValue, parent },
  );
};

/**
 * Creates a mock AbstractControl with a sibling that has null value
 * @param field1Value The value of the main control
 * @returns A Jasmine spy object mimicking AbstractControl with null sibling
 */
export const createControlSpyWithNullSibling = (
  field1Value: unknown,
): jasmine.SpyObj<AbstractControl> =>
  createAbstractControlSpyWithSibling(field1Value, null);

/**
 * Creates a mock AbstractControl with a sibling that has undefined value
 * @param field1Value The value of the main control
 * @returns A Jasmine spy object mimicking AbstractControl with undefined sibling
 */
export const createControlSpyWithUndefinedSibling = (
  field1Value: unknown,
): jasmine.SpyObj<AbstractControl> =>
  createAbstractControlSpyWithSibling(field1Value, undefined);

/**
 * Creates a mock AbstractControl with no parent (orphan control)
 * Used for testing validators that depend on parent FormGroup
 * @param value The value of the control
 * @returns A Jasmine spy object mimicking AbstractControl without parent
 */
export const createOrphanControlSpy = <T>(
  value: T,
): jasmine.SpyObj<AbstractControl> =>
  jasmine.createSpyObj<AbstractControl>(
    'AbstractControl',
    {},
    { value, parent: null },
  );
