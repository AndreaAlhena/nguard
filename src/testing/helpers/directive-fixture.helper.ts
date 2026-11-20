import { Component, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TestHostComponent } from '../components/test-host.component';
import type { DirectiveFixture } from '../types/directive-fixture.type';

/**
 * Creates a TestBed fixture that hosts the supplied directive on a generic component.
 * Signal-based inputs (`input()` / `input.required()`) cannot be assigned directly on a
 * directive instance, so tests must drive them through a host binding. Each spec passes
 * its own template literal containing the directive's selector bound to `value`.
 *
 * The optional `initialValue` is assigned to the host before the first change detection
 * pass so that `input.required<T>()` directives are satisfied at fixture creation time.
 * Tests can later overwrite `host.value` and call `fixture.detectChanges()` to update.
 *
 * @param directiveType The directive class under test.
 * @param template Inline template applied to the host component, e.g. `<div [nguardAlpha]="value"></div>`.
 * @param initialValue Initial value for the host's `value` property. Required for directives with `input.required<T>()`.
 * @returns The directive instance, the host fixture and the host component.
 */
export const createDirectiveFixture = <T>(
  directiveType: Type<T>,
  template: string,
  initialValue: unknown = undefined,
): DirectiveFixture<T> => {
  @Component({
    imports: [directiveType],
    standalone: true,
    template,
  })
  class HostComponent extends TestHostComponent {}

  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture = TestBed.createComponent(HostComponent);
  fixture.componentInstance.value = initialValue;
  fixture.detectChanges();

  const directive = fixture.debugElement
    .query(By.directive(directiveType))
    .injector.get(directiveType);

  return { directive, fixture, host: fixture.componentInstance };
};
