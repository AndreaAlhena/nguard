import type { ComponentFixture } from '@angular/core/testing';
import type { AbstractControl } from '@angular/forms';
import { NguardDecimalDirective } from './nguard-decimal.directive';
import type { TestHostComponent } from '../../../testing/components/test-host.component';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardDecimalDirective', () => {
  let control: AbstractControl;
  let directive: NguardDecimalDirective;
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    ({ directive, fixture, host } = createDirectiveFixture(
      NguardDecimalDirective,
      '<div [nguardDecimal]="$any(value)"></div>',
      2,
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate exact decimal places', () => {
    control = createAbstractControlSpy('1.23');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail when too few decimal places', () => {
    control = createAbstractControlSpy('1.2');

    expect(directive.validate(control)).toEqual({ decimal: true });
  });

  it('should validate within a range when given a tuple', () => {
    host.value = [1, 3];
    fixture.detectChanges();
    control = createAbstractControlSpy('1.23');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail outside the range', () => {
    host.value = [1, 3];
    fixture.detectChanges();
    control = createAbstractControlSpy('1.2345');

    expect(directive.validate(control)).toEqual({ decimal: true });
  });
});
