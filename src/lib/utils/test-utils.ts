export const createAbstractControlSpy = (value: string) => jasmine.createSpyObj('AbstractControl', {}, { value });

export const createAbstractControlSpyWithSibling = (field1Value: string, field2Value: string) => {
  const parent = jasmine.createSpyObj('FormGroup', ['get']);
  const control1 = jasmine.createSpyObj('FormControl', [], {value: field1Value, parent});
  const control2 = jasmine.createSpyObj('FormControl', [], {value: field2Value});

  parent.get.and.returnValue(control2);

  return control1;
}
// export const createGroupWithControls = (...controls: {[key: string]: any}[]) => jasmine.createSpyObj(
//   'AbstractControl',
//   {}, {
//   controls: controls.map(c => ({[c.key]: c.value}))
// }); 