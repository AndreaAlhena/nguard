import type { ComponentFixture } from '@angular/core/testing';
import type { AbstractControl } from '@angular/forms';
import { NguardAlphaDashDirective } from './nguard-alpha-dash.directive';
import type { TestHostComponent } from '../../../testing/components/test-host.component';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardAlphaDashDirective', () => {
  let control: AbstractControl;
  let directive: NguardAlphaDashDirective;
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    ({ directive, fixture, host } = createDirectiveFixture(
      NguardAlphaDashDirective,
      '<div [nguardAlphaDash]="$any(value)"></div>',
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a properly formatted value (ASCII true)', () => {
    control = createAbstractControlSpy('abcABC_-123');
    host.value = { hasAsciiOnly: true };
    fixture.detectChanges();

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a non properly formatted value (ASCII true)', () => {
    control = createAbstractControlSpy('a 2 c');
    host.value = { hasAsciiOnly: true };
    fixture.detectChanges();

    expect(directive.validate(control)).toEqual({ alphaDash: true });
  });

  it('should validate a properly formatted value (ASCII false)', () => {
    control = createAbstractControlSpy('abc字Б');

    expect(directive.validate(control)).toBeNull();
  });

  it('should validate a non properly formatted value (ASCII false)', () => {
    control = createAbstractControlSpy('a 2 c');

    expect(directive.validate(control)).toEqual({ alphaDash: true });
  });
});
