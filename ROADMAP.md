# nGuard Roadmap

This document outlines the planned releases for the nGuard Angular validation library.

---

## Architectural foundations

The library is organized **by data type**. Every validator function lives in the namespace that matches the data domain it operates on; cross-field validators are reserved for relations that are genuinely type-agnostic (e.g. equality between two fields).

Three namespaces today, more on the way:

- `NguardValidators.CrossField` — validators that read a sibling field via `control.parent.get(...)`
- `NguardValidators.Number` — numeric value validation
- `NguardValidators.String` — string format and length validation

Future namespaces map cleanly onto the same axis: `Array`, `Boolean`, `Async`. Validators that operate on strings — including IP/MAC addresses (network formats) and credit cards / phone numbers / IBAN / etc. (real-world formats) — live in `String`, not in topical groupings, since the data type they operate on *is* a string. Topical organization is a documentation concern, not a namespace one. `Date` is the only genuinely borderline case and stays open pending design (Date objects vs. ISO strings).

### Invariants

- **Validator / directive parity** — every validator function ships with a matching directive that delegates to it without duplicating logic. Reactive forms use the function; template-driven forms use the directive.
- **Type-explicit** — comparisons like `greaterThan` are split per data type. No silent polymorphism between strings and numbers.
- **Signal-based inputs** — directives use `input()` / `input.required()` from `@angular/core` (Angular ≥17.3). Specs use a `createDirectiveFixture` host to drive bindings.
- **No `any`** — source enforces `unknown` over `any` everywhere.
- **DRY primitives** — internal helpers like `_compare(value, target, op)` and `_compareLength(value, target, op)` back the comparison validators.

---

## Current state (v0.1.0 — shipped)

**35 validators across 3 namespaces.** All validators have matching directives; all specs pass.

### `NguardValidators.CrossField` (4)

| Validator | Description |
|-----------|-------------|
| `confirmed` | Field matches a `{field}_confirmation` sibling |
| `different` | Field differs from another field |
| `requiredIf` | Required when another field has a (matching) value |
| `same` | Field equals another field |

### `NguardValidators.Number` (11)

| Validator | Description |
|-----------|-------------|
| `between` | Numeric value within `[min, max]` (inclusive) |
| `greaterThan` | Numeric value strictly greater than a sibling field |
| `greaterThanOrEqual` | Numeric value greater than or equal to a sibling field |
| `integer` | Whole number |
| `lesserThan` | Numeric value strictly lesser than a sibling field |
| `lesserThanOrEqual` | Numeric value lesser than or equal to a sibling field |
| `max` | Numeric value `<=` literal |
| `min` | Numeric value `>=` literal |
| `negative` | Numeric value `< 0` |
| `numeric` | Numeric (integer or floating point) |
| `positive` | Numeric value `> 0` |

### `NguardValidators.String` (20)

| Validator | Description |
|-----------|-------------|
| `alpha` | Unicode alphabetic characters (ASCII-only mode optional) |
| `alphaDash` | Alphanumeric + dash/underscore |
| `alphaNum` | Alphanumeric characters |
| `ascii` | ASCII range only |
| `doesntEndWith` | String doesn't end with one of the given values |
| `doesntStartWith` | String doesn't start with one of the given values |
| `email` | RFC 5322-compliant email |
| `endsWith` | String ends with one of the given values |
| `json` | Valid JSON string |
| `longerOrEqualTo` | Length `>=` a sibling field's length |
| `longerThan` | Length strictly greater than a sibling field's length |
| `lowercase` | All lowercase |
| `notBlank` | Not empty / whitespace-only |
| `notRegex` | Does not match the given pattern |
| `regex` | Matches the given pattern |
| `shorterOrEqualTo` | Length `<=` a sibling field's length |
| `shorterThan` | Length strictly lesser than a sibling field's length |
| `startsWith` | String starts with one of the given values |
| `uppercase` | All uppercase |
| `url` | Valid URL format |

### Architectural changes since the initial v0.1.0 implementation

The architectural refactor (umbrella issue #12, six PRs) reshaped the library between the original v0.1.0 implementation and the post-refactor state above:

- Renamed `MultiValidators` → `CrossFieldValidators` (#21)
- Moved `startsWith`/`endsWith`/`doesntStartWith`/`doesntEndWith` from `Multi` to `String` — they are pure string operations (#24)
- Split polymorphic `gt`/`gte`/`lt`/`lte` into type-explicit `Number.greaterThan/...` and `String.longerThan/...` (#24)
- Dropped the `gt`/`gte`/`lt`/`lte` aliases and the `range` validator (duplicate of `between`) (#24)
- Migrated every directive from `@Input()` to signal-based `input()` / `input.required()` (#21)
- Standardized directive aliasing — every primary input is aliased to the selector (#21)
- Consolidated 5 per-directive interfaces into 3 shared types under `src/lib/types/` (#18)
- Extracted `_compare` and `_compareLength` private helpers used by all comparison validators (#24)

---

## v0.2.0 — Enhanced Strings (formats, length, network)

**Goal:** Expand the `String` namespace with format and length validators, including network address formats.

### `NguardValidators.String` additions

| Validator | Description | Priority |
|-----------|-------------|----------|
| `uuid` | Valid UUID (v1-v5) | High |
| `minLength` | Minimum string length (literal) | High |
| `maxLength` | Maximum string length (literal) | High |
| `length` | Exact string length (literal) | Medium |
| `contains` | String contains substring | Medium |
| `notContains` | String doesn't contain substring | Medium |
| `slug` | Valid URL slug (lowercase, dashes) | Medium |
| `hexColor` | Valid hex color (`#fff`, `#ffffff`) | Medium |
| `ulid` | Valid ULID | Medium |
| `string` | Value is a string (Laravel parity) | — |
| `ip` | Valid IP address (v4 or v6) | High |
| `ipv4` | Valid IPv4 address | High |
| `ipv6` | Valid IPv6 address | High |
| `macAddress` | Valid MAC address | Medium |

### Tasks

- [x] Implement string format / length validators (9 + Laravel-parity `string`)
- [x] Implement IP and MAC address validators in `String` (4)
- [x] Create directives for all new validators (parity invariant)
- [x] Write unit tests
- [ ] Update documentation site

**Total new validators: 14**

---

## v0.3.0 — Numeric Power

**Goal:** Complete numeric validation with advanced constraints.

### `NguardValidators.Number` additions

| Validator | Description | Priority |
|-----------|-------------|----------|
| `digits` | Exact number of digits | High |
| `digitsBetween` | Digit count between min and max | High |
| `decimal` | Decimal with N places | High |
| `multipleOf` | Must be a multiple of N | Medium |
| `minDigits` | Minimum number of digits | Medium |
| `maxDigits` | Maximum number of digits | Medium |
| `even` | Must be even | Low |
| `odd` | Must be odd | Low |

### Tasks

- [ ] Implement 8 number validators
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 8**

> The `Size` polymorphic namespace from earlier drafts is collapsed: per-type length / count validators live in their respective namespaces (`String.minLength`, `Array.minSize` once arrays land, `Number.between` for value ranges).

---

## v0.4.0 — Date & Time

**Goal:** Comprehensive date and time validation.

### `NguardValidators.Date` (new namespace)

| Validator | Description | Priority |
|-----------|-------------|----------|
| `date` | Valid date | High |
| `dateFormat` | Matches a date format | High |
| `after` | Date after another (sibling field, lives in `CrossField` if cross-field) | High |
| `before` | Date before another | High |
| `afterOrEqual` | Date `>=` another | High |
| `beforeOrEqual` | Date `<=` another | High |
| `dateEquals` | Equals a specific date | Medium |
| `afterToday` | In the future | Medium |
| `beforeToday` | In the past | Medium |
| `time` | Valid time format | Medium |
| `dateRange` | Date within a range | Medium |
| `today` | Date is today | Low |
| `timezone` | Valid timezone identifier | Low |

### Tasks

- [ ] Create `DateValidators` namespace
- [ ] Implement 13 date validators (split between `Date` for self-contained and `CrossField` for sibling-comparison variants)
- [ ] Support multiple date formats (ISO, locale, custom)
- [ ] Consider `date-fns` or `dayjs` as optional peer dependency
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 13**

---

## v0.5.0 — Conditional Logic

**Goal:** Advanced conditional validation rules. All extend the existing `CrossField` namespace.

### `NguardValidators.CrossField` additions

| Validator | Description | Priority |
|-----------|-------------|----------|
| `requiredUnless` | Required unless another field equals a value | High |
| `requiredWith` | Required if another field is present | High |
| `requiredWithout` | Required if another field is absent | High |
| `requiredWithAll` | Required if all of the listed fields are present | Medium |
| `requiredWithoutAll` | Required if all of the listed fields are absent | Medium |
| `presentIf` | Must be present if condition holds | Medium |
| `presentUnless` | Must be present unless condition holds | Medium |
| `prohibitedIf` | Must be empty if condition holds | Medium |
| `prohibitedUnless` | Must be empty unless condition holds | Medium |
| `excludeIf` | Skip validation if condition holds | Low |
| `excludeUnless` | Skip validation unless condition holds | Low |

### Tasks

- [ ] Implement 11 conditional validators in `CrossField`
- [ ] Ensure proper integration with Angular form groups
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 11**

---

## v0.6.0 — Boolean & Acceptance

**Goal:** Boolean validation and user acceptance patterns.

### `NguardValidators.Boolean` (new namespace)

| Validator | Description | Priority |
|-----------|-------------|----------|
| `boolean` | Must be boolean-like | High |
| `accepted` | Must be `'yes'`, `'on'`, `1`, or `true` | High |
| `declined` | Must be `'no'`, `'off'`, `0`, or `false` | High |
| `acceptedIf` | Accepted if condition holds | Medium |
| `declinedIf` | Declined if condition holds | Medium |
| `truthy` | Truthy value | Low |
| `falsy` | Falsy value | Low |

### Tasks

- [ ] Create `BooleanValidators` namespace
- [ ] Implement 7 boolean validators
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 7**

---

## v0.7.0 — Arrays & Collections

**Goal:** Validate arrays and their contents.

### `NguardValidators.Array` (new namespace)

| Validator | Description | Priority |
|-----------|-------------|----------|
| `array` | Must be an array | High |
| `minSize` | Minimum item count | High |
| `maxSize` | Maximum item count | High |
| `sizeBetween` | Item count within range | High |
| `distinct` | No duplicate values | High |
| `inArray` | Value exists in another field's array | Medium |
| `contains` | Array contains all specified values | Medium |
| `doesntContain` | Array does not contain values | Medium |
| `arrayOf` | All items match a validator | Medium |
| `requiredArrayKeys` | Array (object) has required keys | Medium |

### Tasks

- [ ] Create `ArrayValidators` namespace
- [ ] Implement 10 array validators
- [ ] Support nested validation with `arrayOf`
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 10**

---

## v0.8.0 — Inclusion & Enumeration

**Goal:** List-based validation and enums.

### Inclusion validators (per data type)

These attach to the data-type namespace they validate against. `String.in('a', 'b')` validates a string against a string list; `Number.in(1, 2)` validates a number against a number list.

| Validator | Description | Priority |
|-----------|-------------|----------|
| `String.in`, `Number.in` | Value in list | High |
| `String.notIn`, `Number.notIn` | Value not in list | High |
| `String.enum`, `Number.enum` | Value matches a TypeScript enum | High |
| `String.equalTo`, `Number.equalTo` | Equals literal value | Medium |
| `String.notEqualTo`, `Number.notEqualTo` | Doesn't equal literal value | Medium |

### Tasks

- [ ] Implement 5 inclusion validators × 2 namespaces = 10 entries
- [ ] Support TypeScript enums in `enum` validator
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 10 (5 concepts × 2 namespaces)**

---

## v0.9.0 — Real-World Formats

**Goal:** Validators for common real-world data formats. All land in the existing `String` namespace — they're string formats, no different from `email` or `uuid`.

### `NguardValidators.String` additions

| Validator | Description | Priority |
|-----------|-------------|----------|
| `creditCard` | Valid credit card number (Luhn) | High |
| `phone` | Valid phone number | High |
| `postalCode` | Valid postal code (by country) | Medium |
| `iban` | Valid IBAN | Medium |
| `bic` | Valid BIC/SWIFT code | Low |
| `isbn` | Valid ISBN-10 or ISBN-13 | Low |
| `ean` | Valid EAN barcode | Low |
| `ssn` | Valid SSN (US) | Low |
| `vatNumber` | Valid VAT number (EU) | Low |

### Tasks

- [ ] Implement 9 format validators in `String`
- [ ] Support country-specific formats where applicable
- [ ] Consider `libphonenumber-js` as optional peer dependency
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 9**

---

## v0.10.0 — Async Validators

**Goal:** Server-side validation through HTTP requests.

### `NguardValidators.Async` (new namespace)

| Validator | Description | Priority |
|-----------|-------------|----------|
| `unique` | Value is unique in backend (HTTP check) | High |
| `exists` | Value exists in backend (HTTP check) | High |
| `uniqueExcept` | Unique except for a given ID (for updates) | High |
| `remoteValidation` | Generic async validator with custom endpoint | High |
| `recaptcha` | Google reCAPTCHA v2/v3 validation | Medium |
| `hCaptcha` | hCaptcha validation | Low |
| `turnstile` | Cloudflare Turnstile validation | Low |

### Architecture considerations

```typescript
// Example usage for unique validator
username: new FormControl('', [], [
  NguardValidators.Async.unique({
    endpoint: '/api/users/check-username',
    method: 'POST',
    debounceTime: 300,
    paramName: 'username'
  })
])
```

### Features

- Configurable HTTP method (GET, POST, PUT)
- Configurable debounce to reduce server load
- Path parameter substitution (`:value`)
- Custom response transformation
- Caching to avoid redundant requests
- Pending state indicator support
- Cancellation of in-flight requests on new input

### Tasks

- [ ] Create `AsyncValidators` namespace
- [ ] Implement HTTP-based validation infrastructure
- [ ] Implement 7 async validators
- [ ] Add debouncing and request cancellation with RxJS
- [ ] Add caching layer for repeated validations
- [ ] Create async directive wrappers
- [ ] Write unit tests with `HttpClientTestingModule`
- [ ] Document integration patterns
- [ ] Update documentation site

**Total new validators: 7**

---

## v1.0.0 — Stable Release

**Goal:** Production-ready stable release.

### Tasks

- [ ] Complete all planned validators
- [ ] Full test coverage (>95%)
- [ ] Performance optimization
- [ ] Bundle size optimization
- [ ] Complete documentation
- [ ] API stability guarantee
- [ ] Migration guide from previous versions
- [ ] Examples repository
- [ ] CHANGELOG up to date

### Additional features

| Feature | Description | Priority |
|---------|-------------|----------|
| `password` | Configurable password strength | High |
| `nullable` | Allow null values | High |
| `file` | File validation (size, type) | Medium |
| `image` | Image validation (dimensions) | Medium |
| `filled` | Not empty when present | Medium |
| `present` | Field must exist | Medium |
| `prohibited` | Must be missing or empty | Medium |

**Total new validators: 7**

---

## Post v1.0.0 — Future enhancements

### Internationalization

- Locale-aware validators
- Custom error messages with i18n support
- Right-to-left (RTL) text support

### Developer experience

- VS Code extension for autocomplete
- ESLint plugin for best practices
- Schematics for Angular CLI

### Advanced features

- Conditional validator composition
- Custom validator builder API
- Form-level validation rules
- Cross-form validation

---

## Summary

| Release | Focus | New validators | Cumulative |
|---------|-------|----------------|------------|
| v0.1.0 | Current state (post-refactor) | — | **35** |
| v0.2.0 | Strings (formats, length, network) | 14 | 49 |
| v0.3.0 | Numeric Power | 8 | 57 |
| v0.4.0 | Date & Time | 13 | 70 |
| v0.5.0 | Conditional Logic | 11 | 81 |
| v0.6.0 | Boolean & Acceptance | 7 | 88 |
| v0.7.0 | Arrays & Collections | 10 | 98 |
| v0.8.0 | Inclusion & Enumeration | 10 | 108 |
| v0.9.0 | Real-World String Formats | 9 | 117 |
| v0.10.0 | Async Validators | 7 | 124 |
| v1.0.0 | Stable Release | 7 | **131** |

---

## Versioning strategy

- **Patch (0.x.Y)** — bug fixes, documentation updates
- **Minor (0.X.0)** — new validators, backward-compatible features
- **Major (X.0.0)** — breaking changes (after v1.0.0; pre-1.0 minor bumps may carry breaking changes when consolidating architecture)

## Contributing

Each release should include:

1. Validator functions in the appropriate namespace
2. Matching Angular directive (validator/directive parity invariant)
3. Unit tests with >95% coverage
4. Documentation pages
5. Updated public API exports
6. CHANGELOG entry
