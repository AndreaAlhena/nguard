import { Directive, Injector, inject, input, runInInjectionContext } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncValidatorConfig } from '../../types/async-validator-config.type';
import { AsyncValidators } from '../../validators/async.validators';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_ASYNC_VALIDATORS,
            useExisting: NguardExistsDirective,
        },
    ],
    selector: '[nguardExists]',
    standalone: true,
})
export class NguardExistsDirective implements AsyncValidator {
    private readonly _injector = inject(Injector);
    public readonly config = input.required<AsyncValidatorConfig>({ alias: 'nguardExists' });

    public validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return runInInjectionContext(this._injector, () => AsyncValidators.exists(this.config()))(
            control
        ) as Observable<ValidationErrors | null>;
    }
}
