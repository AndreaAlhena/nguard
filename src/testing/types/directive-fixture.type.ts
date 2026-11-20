import type { ComponentFixture } from '@angular/core/testing';

import type { TestHostComponent } from '../components/test-host.component';

/**
 * Result of {@link createDirectiveFixture}. Exposes the directive instance, the host
 * component's fixture (for change detection and DOM access) and the host instance whose
 * `value` property is bound to the directive's input through the supplied template.
 */
export type DirectiveFixture<T, H = TestHostComponent> = {
  directive: T;
  fixture: ComponentFixture<H>;
  host: H;
};
