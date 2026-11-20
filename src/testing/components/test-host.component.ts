/**
 * Generic host component used by {@link createDirectiveFixture}. Exposes a single `value`
 * property that test templates bind to the directive's input.
 */
export class TestHostComponent {
  public value: unknown = undefined;
}
