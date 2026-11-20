import type { ComponentFixture } from '@angular/core/testing';
import type { AbstractControl } from '@angular/forms';
import { NguardNumberInListDirective } from './nguard-number-in-list.directive';
import type { TestHostComponent } from '../../../testing/components/test-host.component';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardNumberInListDirective', () => {
  let control: AbstractControl;
  let directive: NguardNumberInListDirective;
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    ({ directive, fixture, host } = createDirectiveFixture(
      NguardNumberInListDirective,
      '<div [nguardNumberInList]="$any(value)"></div>',
      [1, 2, 3],
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should pass when the value is in the list', () => {
    control = createAbstractControlSpy(2);

    expect(directive.validate(control)).toBeNull();
  });

  it('should coerce string-numbers', () => {
    control = createAbstractControlSpy('3');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail when the value is not in the list', () => {
    control = createAbstractControlSpy(9);

    expect(directive.validate(control)).toEqual({ inList: true });
  });

  it('should accept a single value shorthand', () => {
    host.value = 5;
    fixture.detectChanges();
    control = createAbstractControlSpy(5);

    expect(directive.validate(control)).toBeNull();
  });
});
