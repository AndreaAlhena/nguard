---
sidebar_position: 1
slug: /
---

# Getting Started

**nguard** is a validation library for Angular forms with a Laravel-inspired API. Every validator ships in two shapes:

- a **validator function** for reactive forms — `NguardValidators.<Namespace>.<rule>(...args)`
- a **directive** for template-driven forms — `[nguard<Rule>]="...args"`

Both call the same underlying logic; they're never out of sync.

## Installation

```bash
npm install ng-nguard
```

**Peer requirements:** Angular `>=17.3`, since validators rely on signal-based directive inputs that became stable in 17.3.

## Quick start — reactive forms

```ts
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NguardValidators } from 'ng-nguard';

const form = new FormGroup({
    email: new FormControl('', [Validators.required, NguardValidators.String.email]),
    password: new FormControl('', [Validators.required, NguardValidators.String.minLength(8)]),
    passwordConfirm: new FormControl('', [
        Validators.required,
        NguardValidators.CrossField.same('password'),
    ]),
});
```

The validators return the standard Angular `ValidatorFn` shape, so they compose with built-in validators (`Validators.required`, etc.) and any third-party validator.

## Quick start — template-driven forms

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NguardEmailDirective,
    NguardMinLengthDirective,
    NguardSameDirective,
} from 'ng-nguard';

@Component({
    standalone: true,
    imports: [FormsModule, NguardEmailDirective, NguardMinLengthDirective, NguardSameDirective],
    template: `
        <form #f="ngForm">
            <input ngModel name="email" required nguardEmail />
            <input ngModel name="password" required [nguardMinLength]="8" />
            <input ngModel name="passwordConfirm" required [nguardSame]="'password'" />
        </form>
    `,
})
export class SignupForm {}
```

Directives are standalone — import each one you use directly into the component's `imports` array. Selectors mirror validator names: `String.email` → `[nguardEmail]`, `Number.greaterThan` → `[nguardGreaterThan]`, etc.

## Browsing the validators

The sidebar groups validators by namespace:

- **CrossField** — validators that read a sibling field (`same`, `different`, `confirmed`, `requiredIf`)
- **Number** — validators that operate on numeric values (`min`, `max`, `between`, `greaterThan`, …)
- **String** — validators that operate on strings (`alpha`, `email`, `url`, `uuid`, `ip`, …)

Pick a namespace to see the full validator list with signatures, examples, and edge cases.

## Why nguard?

- **Type-explicit** — comparisons like `greaterThan` are split per data type. No silent coercion between strings and numbers.
- **Signal-based directive inputs** — works cleanly with modern Angular and `OnPush` change detection.
- **Validator/directive parity** — every validator function has a matching directive. Reactive and template-driven forms get the same behavior, never one or the other.
- **Laravel-inspired naming** — if you've used Laravel's validation, the rule names will feel familiar.

Read [Architecture](./architecture) next for the design rules behind the namespace organization.
