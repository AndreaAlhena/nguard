import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

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

/**
 * Generic host component used by {@link createDirectiveFixture}. Exposes a single `value`
 * property that test templates bind to the directive's input.
 */
export class TestHostComponent {
    public value: unknown = undefined;
}

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
    initialValue: unknown = undefined
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

    const directive = fixture.debugElement.query(By.directive(directiveType)).injector.get(directiveType);

    return { directive, fixture, host: fixture.componentInstance };
};

/**
 * Creates a mock AbstractControl with the specified value
 * @param value The value to set on the control
 * @returns A Jasmine spy object mimicking AbstractControl
 */
export const createAbstractControlSpy = <T>(value: T) => jasmine.createSpyObj('AbstractControl', {}, { value });

/**
 * Creates a mock AbstractControl with null value
 * @returns A Jasmine spy object mimicking AbstractControl with null value
 */
export const createNullControlSpy = () => createAbstractControlSpy(null);

/**
 * Creates a mock AbstractControl with undefined value
 * @returns A Jasmine spy object mimicking AbstractControl with undefined value
 */
export const createUndefinedControlSpy = () => createAbstractControlSpy(undefined);

/**
 * Creates a mock AbstractControl with empty string value
 * @returns A Jasmine spy object mimicking AbstractControl with empty string value
 */
export const createEmptyStringControlSpy = () => createAbstractControlSpy('');

/**
 * Creates a mock AbstractControl with a sibling control in the parent FormGroup
 * Used for testing multi-field validators
 * @param field1Value The value of the main control
 * @param field2Value The value of the sibling control
 * @returns A Jasmine spy object mimicking AbstractControl with parent FormGroup
 */
export const createAbstractControlSpyWithSibling = (
    field1Value: unknown,
    field2Value: unknown
): jasmine.SpyObj<AbstractControl> => {
    const parent = jasmine.createSpyObj('FormGroup', ['get']);
    const control1 = jasmine.createSpyObj('FormControl', [], { value: field1Value, parent });
    const control2 = jasmine.createSpyObj('FormControl', [], { value: field2Value });

    parent.get.and.returnValue(control2);

    return control1;
};

/**
 * Creates a mock AbstractControl with a sibling that has null value
 * @param field1Value The value of the main control
 * @returns A Jasmine spy object mimicking AbstractControl with null sibling
 */
export const createControlSpyWithNullSibling = (field1Value: unknown): jasmine.SpyObj<AbstractControl> =>
    createAbstractControlSpyWithSibling(field1Value, null);

/**
 * Creates a mock AbstractControl with a sibling that has undefined value
 * @param field1Value The value of the main control
 * @returns A Jasmine spy object mimicking AbstractControl with undefined sibling
 */
export const createControlSpyWithUndefinedSibling = (field1Value: unknown): jasmine.SpyObj<AbstractControl> =>
    createAbstractControlSpyWithSibling(field1Value, undefined);

/**
 * Creates a mock AbstractControl with no parent (orphan control)
 * Used for testing validators that depend on parent FormGroup
 * @param value The value of the control
 * @returns A Jasmine spy object mimicking AbstractControl without parent
 */
export const createOrphanControlSpy = <T>(value: T): jasmine.SpyObj<AbstractControl> =>
    jasmine.createSpyObj('AbstractControl', {}, { value, parent: null });
