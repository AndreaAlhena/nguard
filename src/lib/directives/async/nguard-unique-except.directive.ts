import { Directive, Injector, inject, input, runInInjectionContext } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncValidatorConfig } from '../../types/async-validator-config.type';
import { AsyncValidators } from '../../validators/async.validators';
import { primitive } from '../../utils/validators.utils';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_ASYNC_VALIDATORS,
            useExisting: NguardUniqueExceptDirective,
        },
    ],
    selector: '[nguardUniqueExcept]',
    standalone: true,
})
export class NguardUniqueExceptDirective implements AsyncValidator {
    private readonly _injector = inject(Injector);
    public readonly config = input.required<AsyncValidatorConfig>({ alias: 'nguardUniqueExcept' });
    public readonly exceptId = input.required<primitive>({ alias: 'nguardUniqueExceptId' });

    public validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return runInInjectionContext(this._injector, () =>
            AsyncValidators.uniqueExcept(this.exceptId(), this.config())
        )(control) as Observable<ValidationErrors | null>;
    }
}
