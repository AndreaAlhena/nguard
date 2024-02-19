export const equalityCheck = (value1: any, value2: any, isStrict: boolean = false): boolean => {
  if ( isStrict && value1 === value2 || !isStrict && value1 == value2) {
    return true;
  }

  return false;
}