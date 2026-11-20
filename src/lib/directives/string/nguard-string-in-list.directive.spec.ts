import type { ComponentFixture } from '@angular/core/testing';
import type { AbstractControl } from '@angular/forms';
import { NguardStringInListDirective } from './nguard-string-in-list.directive';
import type { TestHostComponent } from '../../../testing/components/test-host.component';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardStringInListDirective', () => {
  let control: AbstractControl;
  let directive: NguardStringInListDirective;
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    ({ directive, fixture, host } = createDirectiveFixture(
      NguardStringInListDirective,
      '<div [nguardStringInList]="$any(value)"></div>',
      ['draft', 'published'],
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should pass when the value is in the list', () => {
    control = createAbstractControlSpy('draft');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail when the value is not in the list', () => {
    control = createAbstractControlSpy('archived');

    expect(directive.validate(control)).toEqual({ inList: true });
  });

  it('should accept a single value shorthand', () => {
    host.value = 'draft';
    fixture.detectChanges();
    control = createAbstractControlSpy('draft');

    expect(directive.validate(control)).toBeNull();
  });
});
