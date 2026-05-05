<p align="center">
   <img src="https://i.postimg.cc/523Qws7W/logo.png" alt="ng-nguard logo" width="300">
</p>

<p align="center">
   <a href="https://www.npmjs.com/package/ng-nguard"><img src="https://img.shields.io/npm/v/ng-nguard.svg" alt="npm version"></a>
   <a href="https://github.com/AndreaAlhena/nguard/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/ng-nguard.svg" alt="license"></a>
   <a href="https://nguard.andreatantimonaco.me"><img src="https://img.shields.io/badge/docs-nguard.andreatantimonaco.me-blue" alt="docs"></a>
</p>

# ng-nguard

Angular validation library with a Laravel-inspired API. Validators are organized **by data type** across three namespaces (`String`, `Number`, `CrossField`) and ship in two shapes — a function for reactive forms and a matching directive for template-driven forms.

📚 **Full documentation:** [nguard.andreatantimonaco.me](https://nguard.andreatantimonaco.me)

This README is intentionally minimal. The full validator catalog, per-validator examples, edge cases, and architecture notes live on the docs site.

## Requirements

- **Angular** ≥ 17.3 (signal-based directive inputs)

## Install

```bash
npm install ng-nguard
```

## Quick start

### Reactive forms

```typescript
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    email: new FormControl('', [Validators.required, NguardValidators.String.email]),
    password: new FormControl('', [NguardValidators.String.minLength(8)]),
    passwordConfirm: new FormControl('', [
        NguardValidators.CrossField.confirmed('password'),
    ]),
});
```

### Template-driven forms

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NguardConfirmedDirective,
    NguardEmailDirective,
    NguardMinLengthDirective,
} from 'ng-nguard';

@Component({
    standalone: true,
    imports: [FormsModule, NguardEmailDirective, NguardMinLengthDirective, NguardConfirmedDirective],
    template: `
        <form>
            <input ngModel name="email" required nguardEmail />
            <input ngModel name="password" [nguardMinLength]="8" />
            <input ngModel name="passwordConfirm" [nguardConfirmed]="'password'" />
        </form>
    `,
})
export class SignupForm {}
```

→ See the [docs](https://nguard.andreatantimonaco.me) for the full validator catalog and architecture notes.

## License

MIT © [Andrea Alhena Tantimonaco](https://andreatantimonaco.me)
