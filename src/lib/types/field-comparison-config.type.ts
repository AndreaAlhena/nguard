/**
 * Configuration for validators that compare the current field's value against another
 * sibling field within the same form group. Used by same, different, greaterThan,
 * greaterThanOrEqual, lesserThan, lesserThanOrEqual, confirmed and any future
 * field-comparison validators.
 */
export type FieldComparisonConfig = {
    /**
     * The key of the sibling field to compare against.
     */
    fieldKey: string;
    /**
     * If true, equality checks are performed with the strict equality operator (===).
     * If false or omitted, loose equality (==) is used and type coercion may apply.
     */
    isStrict?: boolean;
};
