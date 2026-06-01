# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.10.0] - 2026-06-01

### Added

- **`Async` namespace** — the library's first asynchronous, HTTP-backed validators.
- `Async.unique` — value must not already exist in the backend.
- `Async.exists` — value must exist in the backend.
- `Async.uniqueExcept` — unique except for a given record id (edit forms).
- `Async.remoteValidation` — generic endpoint-driven validation.
- `AsyncValidatorConfig` type (`endpoint`, `method`, `paramName`, `debounceTime`, `interpret`).
- Matching async directives via `NG_ASYNC_VALIDATORS`: `nguardUnique`, `nguardExists`, `nguardUniqueExcept`, `nguardRemoteValidation`.
- 300ms default debounce, request cancellation, automatic `pending` state, and graceful handling of empty values / HTTP errors.
- Documentation pages and an `Async` sidebar category.

### Notes

- Factories call `inject(HttpClient)` and must be created in an injection context (component field/constructor); directives bridge this via `runInInjectionContext`.
- `recaptcha` / `hCaptcha` / `turnstile` (widget integrations) and a caching layer remain deferred to a future release.

### Changed

- Docs: cut a `0.9.0` version snapshot and advanced the current docs selector to `0.10.0` (now offers 0.6.0 through 0.10.0).

## [0.9.0] - 2026-06-01

### Added

- **Real-world format validators** in the `String` namespace (9 validators).
- `String.creditCard` — card number with Luhn checksum.
- `String.iban` — IBAN with ISO 7064 mod-97 checksum and per-country length.
- `String.bic` — BIC / SWIFT code.
- `String.isbn` — ISBN-10 or ISBN-13.
- `String.ean` — EAN-8 / EAN-13 barcode.
- `String.ssn` — US Social Security Number (excludes never-issued ranges).
- `String.phone` — phone number via libphonenumber-js (E.164, or national with a country).
- `String.postalCode` / `String.vatNumber` — country-aware (built-in table + generic/EU fallback).
- Matching directives for all nine; the three country-aware validators accept an optional country input.
- Documentation pages and sidebar entries for every new validator.

### Dependencies

- Added `libphonenumber-js` as an **optional** `peerDependency`, used only by `String.phone` and tree-shaken away otherwise.

### Changed

- Docs: cut a `0.8.0` version snapshot and advanced the current docs selector to `0.9.0` (now offers 0.6.0, 0.7.0, 0.8.0, 0.9.0).

## [0.8.0] - 2026-06-01

### Added

- **Inclusion & Enumeration validators** across the `String` and `Number` namespaces (5 concepts × 2 = 10 validators).
- `String.inList` / `Number.inList` — value is one of a list.
- `String.notInList` / `Number.notInList` — value is not in a list.
- `String.inEnum` / `Number.inEnum` — value is a member of a TypeScript enum (numeric reverse-mapping keys ignored).
- `String.equalTo` / `Number.equalTo` — value equals a literal.
- `String.notEqualTo` / `Number.notEqualTo` — value does not equal a literal.
- Matching signal-based directives for all ten, prefixed by data type (`nguardStringInList`, `nguardNumberInList`, …) to avoid cross-namespace selector clashes.
- Documentation pages and sidebar entries for every new validator.

### Notes

- `String.*` validators use strict comparison; `Number.*` validators coerce numerically (matching each namespace's existing convention). `in`/`enum` were renamed to `inList`/`inEnum` (reserved words).

### Changed

- Docs: cut a `0.7.0` version snapshot and advanced the current docs selector to `0.8.0` (selector now offers 0.6.0, 0.7.0, 0.8.0).

## [0.7.0] - 2026-05-31

### Added

- **`Array` namespace** — new validator namespace for arrays and collections, alphabetized first across the public API and docs sidebar.
- `Array.array` — value is a JavaScript array.
- `Array.minSize` / `Array.maxSize` / `Array.sizeBetween` — item-count bounds.
- `Array.distinct` — no duplicate values (Set value-equality for primitives).
- `Array.contains` / `Array.doesntContain` — required / forbidden members.
- `Array.inArray` — value is a member of a sibling field's array.
- `Array.arrayOf` — every item passes a supplied validator.
- `Array.requiredArrayKeys` — value is an object containing the given keys.
- Matching signal-based directives for all ten validators (validator/directive parity); `contains`/`doesntContain` use the `nguardArrayContains`/`nguardArrayDoesntContain` selectors to avoid clashing with the String directives.
- Documentation pages and an `Array` sidebar category for every new validator.

### Changed

- Docs version selector now reads `0.7.0`.

## [0.6.0] - 2026-05-30

### Added

- **`Boolean` namespace** — new validator namespace for boolean and acceptance validation, alphabetized first across the public API and docs sidebar.
- `Boolean.boolean` — value is boolean-like (`true`, `false`, `1`, `0`, `'1'`, `'0'`), Laravel parity.
- `Boolean.accepted` — value indicates acceptance (`true`, `'true'`, `1`, `'1'`, `'yes'`, `'on'`).
- `Boolean.declined` — value indicates decline (`false`, `'false'`, `0`, `'0'`, `'no'`, `'off'`).
- `Boolean.acceptedIf` — must be accepted when a sibling field matches a trigger value.
- `Boolean.declinedIf` — must be declined when a sibling field matches a trigger value.
- `Boolean.truthy` — `Boolean(value) === true`.
- `Boolean.falsy` — `Boolean(value) === false`.
- Matching signal-based directives for all seven validators (`nguardBoolean`, `nguardAccepted`, `nguardDeclined`, `nguardAcceptedIf`, `nguardDeclinedIf`, `nguardTruthy`, `nguardFalsy`), each delegating to its validator (validator/directive parity).
- Documentation pages and a `Boolean` sidebar category for every new validator.

### Changed

- Extracted the `evaluateCondition` helper into `validators.utils` so the `Boolean` and `CrossField` namespaces share one sibling-condition implementation.

## [0.1.0] - 2025-12-11

### Added

#### String Validators
- `alpha` - Only alphabetic characters
- `alphaDash` - Alphabetic characters with dashes and underscores
- `alphaNum` - Alphanumeric characters
- `ascii` - ASCII characters only
- `email` - Valid email format
- `json` - Valid JSON string
- `lowercase` - All lowercase characters
- `notBlank` - Not empty or whitespace-only
- `notRegex` - Does not match regex pattern
- `regex` - Matches regex pattern
- `uppercase` - All uppercase characters
- `url` - Valid URL format

#### Number Validators
- `between` - Number within range
- `integer` - Integer value
- `max` - Maximum value
- `min` - Minimum value
- `negative` - Negative number
- `numeric` - Numeric value (int or float)
- `positive` - Positive number
- `range` - Alias for between

#### Multi-Field Validators
- `confirmed` - Field matches `{field}_confirmation`
- `different` - Different from another field
- `doesntEndWith` - Doesn't end with values
- `doesntStartWith` - Doesn't start with values
- `endsWith` - Ends with one of values
- `greaterThan` (`gt`) - Greater than another field
- `greaterThanOrEqual` (`gte`) - Greater than or equal
- `lesserThan` (`lt`) - Less than another field
- `lesserThanOrEqual` (`lte`) - Less than or equal
- `requiredIf` - Required if condition met
- `same` - Same as another field
- `startsWith` - Starts with one of values

#### Directives
- Template-driven form directives for all validators

#### Documentation
- SvelteKit documentation site with usage examples
