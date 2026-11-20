import type { ComponentFixture } from '@angular/core/testing';
import type { AbstractControl } from '@angular/forms';
import { NguardEndsWithDirective } from './nguard-ends-with.directive';
import type { TestHostComponent } from '../../../testing/components/test-host.component';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardEndsWithDirective', () => {
  let control: AbstractControl;
  let directive: NguardEndsWithDirective;
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    ({ directive, fixture, host } = createDirectiveFixture(
      NguardEndsWithDirective,
      '<div [nguardEndsWith]="$any(value)"></div>',
      '123',
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a field that ends with (single value / no array)', () => {
    control = createAbstractControlSpy('abcABC123');

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a field that ends with', () => {
    control = createAbstractControlSpy('abcABC123');
    host.value = ['123', '456'];
    fixture.detectChanges();

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail if the field doesnt ends with (single value / no array)', () => {
    control = createAbstractControlSpy('abcABC123');
    host.value = '12';
    fixture.detectChanges();

    expect(directive.validate(control)).toEqual({ endsWith: true });
  });

  it('should fail if the field doesnt ends with', () => {
    control = createAbstractControlSpy('abcABC123');
    host.value = ['abc', '12'];
    fixture.detectChanges();

    expect(directive.validate(control)).toEqual({ endsWith: true });
  });

  it('should validate a field that ends with (number)', () => {
    control = createAbstractControlSpy('abcABC123');
    host.value = [123, '456'];
    fixture.detectChanges();

    expect(directive.validate(control)).toBeNull();
  });
});
