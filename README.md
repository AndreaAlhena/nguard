# nGuard

<div style='text-align: center'>
  <img src='https://i.postimg.cc/523Qws7W/logo.png' border='0' alt='logo' width='300'>
</div>

An Angular validation library inspired by Laravel's validation approach. Provides a comprehensive set of validators for reactive and template-driven forms.

## Installation

```bash
npm install nguard
```

## Requirements

- Angular 17.1.0 or higher
- Node.js 18.13.0+ or 20.9.0+

## Quick Start

### Reactive Forms

```typescript
import { NguardValidators } from 'nguard';
import { FormControl, FormGroup } from '@angular/forms';

const form = new FormGroup({
  email: new FormControl('', [NguardValidators.String.email]),
  age: new FormControl('', [NguardValidators.Number.min(18)]),
  password: new FormControl(''),
  password_confirmation: new FormControl('', [NguardValidators.Multi.confirmed('password')])
});
```

### Template-Driven Forms

```html
<input type="email" name="email" ngModel nguardEmail>
<input type="number" name="age" ngModel [nguardMin]="18">
```

## Available Validators

### String Validators

| Validator | Description |
|-----------|-------------|
| `alpha` | Only alphabetic characters |
| `alphaDash` | Alphabetic characters, dashes, underscores |
| `alphaNum` | Alphanumeric characters |
| `ascii` | ASCII characters only |
| `email` | Valid email format |
| `json` | Valid JSON string |
| `lowercase` | All lowercase characters |
| `notBlank` | Not empty or whitespace-only |
| `notRegex(pattern)` | Does not match regex pattern |
| `regex(pattern)` | Matches regex pattern |
| `uppercase` | All uppercase characters |
| `url` | Valid URL format |

### Number Validators

| Validator | Description |
|-----------|-------------|
| `between(min, max)` | Number within range |
| `integer` | Integer value |
| `max(value)` | Maximum value |
| `min(value)` | Minimum value |
| `negative` | Negative number |
| `numeric` | Numeric value (int or float) |
| `positive` | Positive number |

### Multi-Field Validators

| Validator | Description |
|-----------|-------------|
| `confirmed(field)` | Matches `{field}_confirmation` |
| `different(field)` | Different from another field |
| `same(field)` | Same as another field |
| `greaterThan(field)` / `gt` | Greater than another field |
| `greaterThanOrEqual(field)` / `gte` | Greater than or equal |
| `lesserThan(field)` / `lt` | Less than another field |
| `lesserThanOrEqual(field)` / `lte` | Less than or equal |
| `requiredIf(field, value?)` | Required if condition met |
| `startsWith(...values)` | Starts with one of values |
| `endsWith(...values)` | Ends with one of values |
| `doesntStartWith(...values)` | Doesn't start with values |
| `doesntEndWith(...values)` | Doesn't end with values |

## Usage Examples

### Email Validation

```typescript
// Reactive
new FormControl('', [NguardValidators.String.email]);

// Template-driven
<input ngModel nguardEmail>
```

### Number Range

```typescript
// Reactive
new FormControl('', [NguardValidators.Number.between(1, 100)]);

// Template-driven
<input ngModel [nguardBetween]="[1, 100]">
```

### Password Confirmation

```typescript
const form = new FormGroup({
  password: new FormControl(''),
  password_confirmation: new FormControl('', [
    NguardValidators.Multi.confirmed('password')
  ])
});
```

### Conditional Required

```typescript
// Required if 'subscribe' field is true
new FormControl('', [NguardValidators.Multi.requiredIf('subscribe', true)]);
```

## Documentation

Full documentation is available in the `/docs` folder.

## License

MIT
