import type { ComponentFixture } from '@angular/core/testing';
import type { AbstractControl } from '@angular/forms';
import { NguardInArrayDirective } from './nguard-in-array.directive';
import type { TestHostComponent } from '../../../testing/components/test-host.component';
import { createAbstractControlSpyWithSibling } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardInArrayDirective', () => {
  let control: AbstractControl;
  let directive: NguardInArrayDirective;
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    ({ directive, fixture, host } = createDirectiveFixture(
      NguardInArrayDirective,
      '<div [nguardInArray]="$any(value)"></div>',
      'allowedColors',
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate when the value is a member of the sibling array / config as string', () => {
    control = createAbstractControlSpyWithSibling('red', ['red', 'green']);

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail when the value is not a member / config as string', () => {
    control = createAbstractControlSpyWithSibling('blue', ['red', 'green']);

    expect(directive.validate(control)).toEqual({ inArray: true });
  });

  it('should distinguish string and number under strict comparison / config as object', () => {
    host.value = { fieldKey: 'ids', isStrict: true };
    fixture.detectChanges();
    control = createAbstractControlSpyWithSibling('1', [1, 2]);

    expect(directive.validate(control)).toEqual({ inArray: true });
  });
});
