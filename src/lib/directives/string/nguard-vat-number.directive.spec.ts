import type { AbstractControl } from '@angular/forms';
import { NguardVatNumberDirective } from './nguard-vat-number.directive';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';
import { createDirectiveFixture } from '../../../testing/helpers/directive-fixture.helper';

describe('NguardVatNumberDirective', () => {
  let control: AbstractControl;
  let directive: NguardVatNumberDirective;

  beforeEach(() => {
    ({ directive } = createDirectiveFixture(
      NguardVatNumberDirective,
      '<div [nguardVatNumber]="$any(value)"></div>',
      'DE',
    ));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate a German VAT number', () => {
    control = createAbstractControlSpy('DE123456789');

    expect(directive.validate(control)).toBeNull();
  });

  it('should fail an invalid VAT number', () => {
    control = createAbstractControlSpy('DE12');

    expect(directive.validate(control)).toEqual({ vatNumber: true });
  });
});
