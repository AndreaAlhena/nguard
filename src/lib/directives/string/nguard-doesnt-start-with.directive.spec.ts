import type { ComponentFixture } from '@angular/core/testing';
import type { AbstractControl } from '@angular/forms';
import { NguardDoesntStartWithDirective } from './nguard-doesnt-start-with.directive';
import type { TestHostComponent } from '../../../testing/components/test-host.component';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardDoesntStartWithDirective', () => {
  let control: AbstractControl;
  let directive: NguardDoesntStartWithDirective;
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    ({ directive, fixture, host } = createDirectiveFixture(
      NguardDoesntStartWithDirective,
      '<div [nguardDoesntStartWith]="$any(value)"></div>',
      'C12',
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a field that doesnt start with (single value / no array)', () => {
    control = createAbstractControlSpy('abcABC123');

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a field that doesnt start with', () => {
    control = createAbstractControlSpy('abcABC123');
    host.value = ['123', 'def'];
    fixture.detectChanges();

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail if the field starts with (single value / no array)', () => {
    control = createAbstractControlSpy('abcABC123');
    host.value = 'abc';
    fixture.detectChanges();

    expect(directive.validate(control)).toEqual({ doesntStartWith: true });
  });

  it('should fail if the field starts with', () => {
    control = createAbstractControlSpy('abcABC123');
    host.value = ['abc'];
    fixture.detectChanges();

    expect(directive.validate(control)).toEqual({ doesntStartWith: true });
  });

  it('should fail if the field starts with (mixed types)', () => {
    control = createAbstractControlSpy('123abc');
    host.value = [123];
    fixture.detectChanges();

    expect(directive.validate(control)).toEqual({ doesntStartWith: true });
  });
});
