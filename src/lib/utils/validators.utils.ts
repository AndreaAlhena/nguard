export type primitive = boolean | number | string;

export const equalityCheck = (value1: unknown, value2: unknown, isStrict: boolean = false): boolean => {
  if (isStrict) {
    return value1 === value2;
  }
  // eslint-disable-next-line eqeqeq -- Intentional loose comparison for type coercion
  return value1 == value2;
};