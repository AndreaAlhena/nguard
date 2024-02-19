export const createAbstractControlSpy = <T>(value: T) => jasmine.createSpyObj('AbstractControl', {}, { value });

export const createAbstractControlSpyWithSibling = (field1Value: string, field2Value: string) => {
  const parent = jasmine.createSpyObj('FormGroup', ['get']);
  const control1 = jasmine.createSpyObj('FormControl', [], {value: field1Value, parent});
  const control2 = jasmine.createSpyObj('FormControl', [], {value: field2Value});

  parent.get.and.returnValue(control2);

  return control1;
}
