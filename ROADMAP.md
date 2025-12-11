# nGuard Roadmap

This document outlines the planned releases for the nGuard Angular validation library.

---

## Current State (v0.0.1)

### Implemented Validators

**String Validators (7)**
- `alpha` - Unicode alphabetic characters
- `alphaDash` - Alphanumeric + dash/underscore
- `alphaNum` - Alphanumeric characters
- `ascii` - ASCII characters only
- `lowercase` - Must be lowercase
- `uppercase` - Must be uppercase
- `url` - Valid URL format

**Multi-field Validators (8)**
- `same` - Field equals another field
- `different` - Field differs from another field
- `startsWith` - Starts with given value(s)
- `endsWith` - Ends with given value(s)
- `doesntStartWith` - Doesn't start with value(s)
- `doesntEndWith` - Doesn't end with value(s)
- `requiredIf` - Required if condition met

---

## v0.1.0 - Core Essentials

**Goal:** Implement the most commonly used validators that every form needs.

### String Validators
| Validator | Description | Priority |
|-----------|-------------|----------|
| `email` | Valid email address (RFC 5322 compliant) | High |
| `regex` | Matches a regular expression pattern | High |
| `notRegex` | Does not match a pattern | High |
| `json` | Valid JSON string | Medium |
| `notBlank` | Not empty or whitespace only | High |

### Number Validators (New Namespace)
| Validator | Description | Priority |
|-----------|-------------|----------|
| `integer` | Must be an integer | High |
| `numeric` | Must be numeric (int or float) | High |
| `min` | Minimum value | High |
| `max` | Maximum value | High |
| `between` | Value between min and max | High |
| `positive` | Must be > 0 | Medium |
| `negative` | Must be < 0 | Medium |

### Multi-field Validators
| Validator | Description | Priority |
|-----------|-------------|----------|
| `confirmed` | Field matches `{field}_confirmation` | High |
| `gt` | Greater than another field | High |
| `gte` | Greater than or equal to another field | High |
| `lt` | Less than another field | High |
| `lte` | Less than or equal to another field | High |

### Tasks
- [ ] Create `NumberValidators` namespace
- [ ] Implement 5 string validators
- [ ] Implement 7 number validators
- [ ] Implement 5 multi-field validators
- [ ] Add null/empty value handling to all validators
- [ ] Create directives for all new validators
- [ ] Write unit tests (100% coverage target)
- [ ] Update documentation site

**Total new validators: 17**

---

## v0.2.0 - Enhanced Strings & Network

**Goal:** Add network-related validators and enhance string validation capabilities.

### String Validators
| Validator | Description | Priority |
|-----------|-------------|----------|
| `uuid` | Valid UUID (v1-v5) | High |
| `ulid` | Valid ULID | Medium |
| `hexColor` | Valid hex color (#fff, #ffffff) | Medium |
| `slug` | Valid URL slug (lowercase, dashes) | Medium |
| `contains` | String contains substring | Medium |
| `notContains` | String doesn't contain substring | Medium |
| `length` | Exact string length | Medium |
| `minLength` | Minimum string length | High |
| `maxLength` | Maximum string length | High |

### Network Validators (New Namespace)
| Validator | Description | Priority |
|-----------|-------------|----------|
| `ip` | Valid IP address (v4 or v6) | High |
| `ipv4` | Valid IPv4 address | High |
| `ipv6` | Valid IPv6 address | High |
| `macAddress` | Valid MAC address | Medium |

### Tasks
- [ ] Create `NetworkValidators` namespace
- [ ] Implement 9 string validators
- [ ] Implement 4 network validators
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 13**

---

## v0.3.0 - Numeric Power

**Goal:** Complete numeric validation with advanced constraints.

### Number Validators
| Validator | Description | Priority |
|-----------|-------------|----------|
| `digits` | Exact number of digits | High |
| `digitsBetween` | Digit count between min/max | High |
| `minDigits` | Minimum number of digits | Medium |
| `maxDigits` | Maximum number of digits | Medium |
| `decimal` | Decimal with N places | High |
| `multipleOf` | Must be multiple of N | Medium |
| `even` | Must be even number | Low |
| `odd` | Must be odd number | Low |

### Size Validators (New - works across types)
| Validator | Description | Priority |
|-----------|-------------|----------|
| `size` | Exact size (string length, array count, number value) | High |
| `minSize` | Minimum size | High |
| `maxSize` | Maximum size | High |
| `sizeBetween` | Size between min and max | High |

### Tasks
- [ ] Create `SizeValidators` namespace (polymorphic)
- [ ] Implement 8 number validators
- [ ] Implement 4 size validators
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 12**

---

## v0.4.0 - Date & Time

**Goal:** Comprehensive date and time validation.

### Date Validators (New Namespace)
| Validator | Description | Priority |
|-----------|-------------|----------|
| `date` | Must be a valid date | High |
| `dateFormat` | Must match date format | High |
| `dateEquals` | Must equal specific date | Medium |
| `after` | Date must be after another | High |
| `before` | Date must be before another | High |
| `afterOrEqual` | Date >= another | High |
| `beforeOrEqual` | Date <= another | High |
| `afterToday` | Date must be in the future | Medium |
| `beforeToday` | Date must be in the past | Medium |
| `today` | Date must be today | Low |
| `timezone` | Valid timezone identifier | Low |
| `time` | Valid time format | Medium |
| `dateRange` | Date within a range | Medium |

### Tasks
- [ ] Create `DateValidators` namespace
- [ ] Implement 13 date validators
- [ ] Support multiple date formats (ISO, locale, custom)
- [ ] Consider date-fns or dayjs as optional peer dependency
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 13**

---

## v0.5.0 - Conditional Logic

**Goal:** Advanced conditional validation rules.

### Conditional Validators (extend Multi namespace)
| Validator | Description | Priority |
|-----------|-------------|----------|
| `requiredUnless` | Required unless field = value | High |
| `requiredWith` | Required if other field present | High |
| `requiredWithAll` | Required if all fields present | Medium |
| `requiredWithout` | Required if other field absent | High |
| `requiredWithoutAll` | Required if all fields absent | Medium |
| `presentIf` | Must be present if condition | Medium |
| `presentUnless` | Must be present unless condition | Medium |
| `prohibitedIf` | Must be empty if condition | Medium |
| `prohibitedUnless` | Must be empty unless condition | Medium |
| `excludeIf` | Exclude from validation if condition | Low |
| `excludeUnless` | Exclude unless condition | Low |

### Tasks
- [ ] Implement 11 conditional validators
- [ ] Ensure proper integration with Angular form groups
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 11**

---

## v0.6.0 - Boolean & Acceptance

**Goal:** Boolean validation and user acceptance patterns.

### Boolean Validators (New Namespace)
| Validator | Description | Priority |
|-----------|-------------|----------|
| `boolean` | Must be boolean-like | High |
| `accepted` | Must be "yes", "on", 1, true | High |
| `declined` | Must be "no", "off", 0, false | High |
| `acceptedIf` | Accepted if condition met | Medium |
| `declinedIf` | Declined if condition met | Medium |
| `truthy` | Must be truthy value | Low |
| `falsy` | Must be falsy value | Low |

### Tasks
- [ ] Create `BooleanValidators` namespace
- [ ] Implement 7 boolean validators
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 7**

---

## v0.7.0 - Arrays & Collections

**Goal:** Validate arrays and their contents.

### Array Validators (New Namespace)
| Validator | Description | Priority |
|-----------|-------------|----------|
| `array` | Must be an array | High |
| `arrayMin` | Array with minimum items | High |
| `arrayMax` | Array with maximum items | High |
| `arrayBetween` | Array size between min/max | High |
| `distinct` | No duplicate values | High |
| `inArray` | Value exists in another field's array | Medium |
| `contains` | Array contains all specified values | Medium |
| `doesntContain` | Array doesn't contain values | Medium |
| `requiredArrayKeys` | Array has required keys | Medium |
| `arrayOf` | All items match a validator | Medium |

### Tasks
- [ ] Create `ArrayValidators` namespace
- [ ] Implement 10 array validators
- [ ] Support nested validation with `arrayOf`
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 10**

---

## v0.8.0 - Inclusion & Enumeration

**Goal:** List-based validation and enums.

### Inclusion Validators
| Validator | Description | Priority |
|-----------|-------------|----------|
| `in` | Value must be in list | High |
| `notIn` | Value must not be in list | High |
| `enum` | Value must be valid enum member | High |
| `equalTo` | Must equal specific value | Medium |
| `notEqualTo` | Must not equal specific value | Medium |

### Tasks
- [ ] Implement 5 inclusion validators
- [ ] Support TypeScript enums in `enum` validator
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 5**

---

## v0.9.0 - Real-World Formats

**Goal:** Validators for common real-world data formats.

### Format Validators (New Namespace)
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
- [ ] Create `FormatValidators` namespace
- [ ] Implement 9 format validators
- [ ] Support country-specific formats where applicable
- [ ] Consider libphonenumber-js as optional peer dependency
- [ ] Create directives for all new validators
- [ ] Write unit tests
- [ ] Update documentation site

**Total new validators: 9**

---

## v0.10.0 - Async Validators

**Goal:** Server-side validation through HTTP requests.

### Async Validators (New Namespace)
| Validator | Description | Priority |
|-----------|-------------|----------|
| `unique` | Value is unique in backend (HTTP check) | High |
| `exists` | Value exists in backend (HTTP check) | High |
| `uniqueExcept` | Unique except for a given ID (for updates) | High |
| `remoteValidation` | Generic async validator with custom endpoint | High |
| `recaptcha` | Google reCAPTCHA v2/v3 validation | Medium |
| `hCaptcha` | hCaptcha validation | Low |
| `turnstile` | Cloudflare Turnstile validation | Low |

### Architecture Considerations
```typescript
// Example usage for unique validator
username: new FormControl('', [], [
  NguardAsyncValidators.unique({
    endpoint: '/api/users/check-username',
    method: 'POST',
    debounceTime: 300,
    paramName: 'username'
  })
])

// Example usage for exists validator
categoryId: new FormControl('', [], [
  NguardAsyncValidators.exists({
    endpoint: '/api/categories/:value',
    method: 'GET'
  })
])

// Generic remote validation
email: new FormControl('', [], [
  NguardAsyncValidators.remoteValidation({
    endpoint: '/api/validate/email',
    method: 'POST',
    transform: (response) => response.isValid ? null : { remoteValidation: response.message }
  })
])
```

### Features
- Configurable HTTP method (GET, POST, PUT)
- Configurable debounce time to reduce server load
- Configurable parameter name and request body format
- Support for path parameters (`:value` substitution)
- Custom response transformation
- Caching options to avoid redundant requests
- Pending state indicator support
- Cancellation of in-flight requests on new input

### Tasks
- [ ] Create `AsyncValidators` namespace
- [ ] Implement HTTP-based validation infrastructure
- [ ] Implement 7 async validators
- [ ] Add debouncing and request cancellation with RxJS
- [ ] Add caching layer for repeated validations
- [ ] Create async directive wrappers
- [ ] Write unit tests with HttpClientTestingModule
- [ ] Document integration patterns
- [ ] Update documentation site

**Total new validators: 7**

---

## v1.0.0 - Stable Release

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
- [ ] Changelog

### Additional Features
| Feature | Description | Priority |
|---------|-------------|----------|
| `password` | Configurable password strength | High |
| `file` | File validation (size, type) | Medium |
| `image` | Image validation (dimensions) | Medium |
| `nullable` | Allow null values | High |
| `filled` | Not empty when present | Medium |
| `present` | Field must exist | Medium |
| `prohibited` | Must be missing or empty | Medium |

**Total new validators: 7**

---

## Post v1.0.0 - Future Enhancements

### Internationalization
- Locale-aware validators
- Custom error messages with i18n support
- Right-to-left (RTL) text support

### Developer Experience
- VS Code extension for autocomplete
- ESLint plugin for best practices
- Schematics for Angular CLI

### Advanced Features
- Conditional validator composition
- Custom validator builder API
- Form-level validation rules
- Cross-form validation

---

## Summary

| Release | Focus | New Validators | Cumulative |
|---------|-------|----------------|------------|
| v0.0.1 | Current | 15 | 15 |
| v0.1.0 | Core Essentials | 17 | 32 |
| v0.2.0 | Strings & Network | 13 | 45 |
| v0.3.0 | Numeric Power | 12 | 57 |
| v0.4.0 | Date & Time | 13 | 70 |
| v0.5.0 | Conditional Logic | 11 | 81 |
| v0.6.0 | Boolean & Acceptance | 7 | 88 |
| v0.7.0 | Arrays & Collections | 10 | 98 |
| v0.8.0 | Inclusion & Enumeration | 5 | 103 |
| v0.9.0 | Real-World Formats | 9 | 112 |
| v0.10.0 | Async Validators | 7 | 119 |
| v1.0.0 | Stable Release | 7 | 126 |

**Total planned validators: 126**

---

## Versioning Strategy

- **Patch (0.x.Y)**: Bug fixes, documentation updates
- **Minor (0.X.0)**: New validators, backward-compatible features
- **Major (X.0.0)**: Breaking changes (after v1.0.0)

## Contributing

Each release should include:
1. Validator functions in appropriate namespace
2. Angular directives for template-driven forms
3. Unit tests with >95% coverage
4. Documentation pages
5. Updated public API exports
6. Changelog entry
