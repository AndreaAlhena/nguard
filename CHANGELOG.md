# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
