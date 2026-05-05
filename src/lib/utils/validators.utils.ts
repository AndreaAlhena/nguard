import { AbstractControl } from '@angular/forms';

export type primitive = boolean | number | string;

export const equalityCheck = (value1: unknown, value2: unknown, isStrict: boolean = false): boolean => {
    if (isStrict) {
        return value1 === value2;
    }
    // eslint-disable-next-line eqeqeq -- Intentional loose comparison for type coercion
    return value1 == value2;
};

/**
 * Evaluate whether the sibling identified by `fieldKey` satisfies the trigger condition.
 * If `value` is omitted the sibling must simply be truthy. If `value` is provided the
 * sibling must equal it (loose equality by default, strict when `isStrict` is true).
 *
 * Shared by the cross-field conditional family (requiredUnless, presentIf, presentUnless,
 * prohibitedIf, prohibitedUnless) and by the boolean conditional pair (acceptedIf, declinedIf).
 */
export const evaluateCondition = (
    control: AbstractControl,
    fieldKey: string,
    value?: primitive,
    isStrict: boolean = false
): boolean => {
    const siblingValue = control.parent?.get(fieldKey)?.value;
    const hasTriggerValue = value !== undefined;

    if (!hasTriggerValue) {
        return Boolean(siblingValue);
    }

    return equalityCheck(siblingValue, value, isStrict);
};

export const haveSameType = (value1: unknown, value2: unknown): boolean => typeof value1 === typeof value2;
