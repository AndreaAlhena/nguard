---
sidebar_position: 2
slug: /architecture
---

# Architecture

nguard is organized by **what data type a validator operates on**, not by topic. This is the single rule that decides where any given validator lives.

## The by-data-type rule

Every validator's namespace matches the type of value it inspects:

| Namespace | Operates on | Examples |
|---|---|---|
| `String` | A string value | `alpha`, `email`, `uuid`, `ip`, `minLength`, `creditCard` (planned) |
| `Number` | A numeric value (or numeric string) | `min`, `between`, `greaterThan`, `digits`, `decimal`, `even` |
| `CrossField` | The relationship between two fields | `same`, `different`, `confirmed`, `requiredIf` |

The result is that ip/url/uuid/email all live in `String` (they're string formats), `greaterThan` lives in `Number` (numeric value comparison), and only validators that genuinely cross fields live in `CrossField`.

### What does *not* exist

- ❌ A `Network` namespace — `ip`, `ipv4`, `ipv6`, `macAddress` operate on strings, so they're in `String`.
- ❌ A `Format` namespace — `creditCard`, `phone`, `iban`, `isbn` operate on strings, so they'll land in `String`.
- ❌ A `Size` namespace — length and count are type-specific. String length lives in `String.minLength` / `String.maxLength`. Array count will live in `Array.minSize` / `Array.maxSize`. There's no polymorphic `Size`.

Topical groupings (network, format, etc.) are organized through **documentation**, not namespaces.

## Validator/directive parity

Every validator function ships with a matching directive that wraps it without duplicating logic.

```ts
// Validator function — for reactive forms
NguardValidators.String.email
// Directive — for template-driven forms
NguardEmailDirective  // selector: [nguardEmail]
```

The directive is a thin shell. Its `validate(control)` body is a single call into the validator function. This means:

- One source of truth for validation behavior
- Bug fixes propagate to both surfaces automatically
- The validator's tests cover the directive's logic

Tests verify both layers separately, but the actual validation work happens in one place.

## Type-explicit comparisons

Some validators conceptually overlap data types — "greater than" works on numbers, "longer than" works on strings. Rather than provide a single polymorphic `gt` that branches on `typeof`, nguard splits them by domain:

```ts
// Numeric comparison
NguardValidators.Number.greaterThan('siblingField');

// String length comparison
NguardValidators.String.longerThan('siblingField');
```

This eliminates a class of footguns where mixing types silently changes meaning. If you need a numeric comparison, you reach for `Number`. If you need a length comparison, you reach for `String`.

The same applies to `lesserThan`/`shorterThan`, `greaterThanOrEqual`/`longerOrEqualTo`, and so on.

## Signal-based directive inputs

Directives use Angular's `input()` / `input.required()` from `@angular/core` (stable since 17.3). The benefit is automatic compatibility with `OnPush` change detection and signal-based reactive primitives downstream.

```ts
@Directive({ /* ... */ })
export class NguardEmailDirective implements Validator {
    public readonly value = input<string>('', { alias: 'nguardEmail' });

    public validate(control: AbstractControl): ValidationErrors | null {
        return StringValidators.email(control);
    }
}
```

Tests interact with these inputs through a `createDirectiveFixture` helper that hosts the directive in a fixture component, since signal inputs are read-only on the directive instance.

## Internal helpers (not part of the public API)

Some patterns repeat across validators — numeric comparison, length comparison, digit counting. Those live in private helpers shared within a namespace's source file:

- `_compare(value, target, op)` in `number.validators.ts` — used by `min`, `max`, `between`, `positive`, `negative`, `greaterThan`, …
- `_compareLength(value, target, op)` in `string.validators.ts` — used by `longerThan`, `shorterThan`, …
- `_compareLengthLiteral(value, target, op)` — used by `length`, `minLength`, `maxLength`
- `_digitCount(value)` in `number.validators.ts` — used by `digits`, `digitsBetween`, `minDigits`, `maxDigits`

These are implementation details. Library consumers always call the public validator functions or use the directives.
