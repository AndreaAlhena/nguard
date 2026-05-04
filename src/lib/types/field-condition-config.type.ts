import { primitive } from '../utils/validators.utils';

/**
 * Configuration for validators that apply a rule conditionally on the value of
 * another sibling field within the same form group. Used by requiredIf and any
 * future conditional validators (requiredUnless, requiredWith, prohibitedIf, ...).
 */
export type FieldConditionConfig = {
    /**
     * The key of the sibling field whose value triggers the condition.
     */
    fieldKey: string;
    /**
     * If true, equality checks against `value` are performed with the strict equality operator (===).
     * If false or omitted, loose equality (==) is used and type coercion may apply.
     */
    isStrict?: boolean;
    /**
     * If provided, the sibling field must equal this value for the condition to trigger.
     * If omitted, any truthy value of the sibling triggers the condition.
     */
    value?: primitive;
};
