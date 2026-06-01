import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { createAbstractControlSpy } from '../utils/test.utils';
import { AsyncValidators } from './async.validators';

describe('Async Validators', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    const build = (factory: () => AsyncValidatorFn): AsyncValidatorFn => TestBed.runInInjectionContext(factory);

    const validate = (fn: AsyncValidatorFn, control: AbstractControl): { value: ValidationErrors | null } => {
        const captured: { value: ValidationErrors | null } = { value: null };
        (fn(control) as Observable<ValidationErrors | null>).subscribe(r => (captured.value = r));
        return captured;
    };

    it('unique - passes when the value does not exist', fakeAsync(() => {
        const fn = build(() => AsyncValidators.unique({ endpoint: '/api/check' }));
        const out = validate(fn, createAbstractControlSpy('alice'));
        tick(300);
        httpMock.expectOne(r => r.url === '/api/check').flush({ exists: false });

        expect(out.value).toBeNull();
    }));

    it('unique - fails when the value exists', fakeAsync(() => {
        const fn = build(() => AsyncValidators.unique({ endpoint: '/api/check' }));
        const out = validate(fn, createAbstractControlSpy('bob'));
        tick(300);
        httpMock.expectOne(r => r.url === '/api/check').flush({ exists: true });

        expect(out.value).toEqual({ unique: true });
    }));

    it('unique - sends the value as a GET query param', fakeAsync(() => {
        const fn = build(() => AsyncValidators.unique({ endpoint: '/api/check', paramName: 'username' }));
        validate(fn, createAbstractControlSpy('carol'));
        tick(300);
        const req = httpMock.expectOne(r => r.url === '/api/check');

        expect(req.request.params.get('username')).toBe('carol');
        req.flush({ exists: false });
    }));

    it('unique - POST sends a JSON body', fakeAsync(() => {
        const fn = build(() =>
            AsyncValidators.unique({ endpoint: '/api/check', method: 'POST', paramName: 'username' })
        );
        validate(fn, createAbstractControlSpy('dave'));
        tick(300);
        const req = httpMock.expectOne('/api/check');

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ username: 'dave' });
        req.flush({ exists: false });
    }));

    it('exists - fails when the value does not exist', fakeAsync(() => {
        const fn = build(() => AsyncValidators.exists({ endpoint: '/api/exists' }));
        const out = validate(fn, createAbstractControlSpy('x'));
        tick(300);
        httpMock.expectOne(r => r.url === '/api/exists').flush({ exists: false });

        expect(out.value).toEqual({ exists: true });
    }));

    it('exists - passes when the value exists', fakeAsync(() => {
        const fn = build(() => AsyncValidators.exists({ endpoint: '/api/exists' }));
        const out = validate(fn, createAbstractControlSpy('y'));
        tick(300);
        httpMock.expectOne(r => r.url === '/api/exists').flush({ exists: true });

        expect(out.value).toBeNull();
    }));

    it('uniqueExcept - sends the except id and passes', fakeAsync(() => {
        const fn = build(() => AsyncValidators.uniqueExcept(42, { endpoint: '/api/check' }));
        const out = validate(fn, createAbstractControlSpy('eve'));
        tick(300);
        const req = httpMock.expectOne(r => r.url === '/api/check');

        expect(req.request.params.get('except')).toBe('42');
        req.flush({ exists: false });

        expect(out.value).toBeNull();
    }));

    it('remoteValidation - fails when the response is not valid', fakeAsync(() => {
        const fn = build(() => AsyncValidators.remoteValidation({ endpoint: '/api/v' }));
        const out = validate(fn, createAbstractControlSpy('z'));
        tick(300);
        httpMock.expectOne(r => r.url === '/api/v').flush({ valid: false });

        expect(out.value).toEqual({ remoteValidation: true });
    }));

    it('short-circuits empty values without a request', fakeAsync(() => {
        const fn = build(() => AsyncValidators.unique({ endpoint: '/api/check' }));
        const out = validate(fn, createAbstractControlSpy(''));
        tick(300);
        httpMock.expectNone(r => r.url === '/api/check');

        expect(out.value).toBeNull();
    }));

    it('resolves null on an HTTP error', fakeAsync(() => {
        const fn = build(() => AsyncValidators.unique({ endpoint: '/api/check' }));
        const out = validate(fn, createAbstractControlSpy('alice'));
        tick(300);
        httpMock.expectOne(r => r.url === '/api/check').flush('boom', { status: 500, statusText: 'Server Error' });

        expect(out.value).toBeNull();
    }));

    it('honours a custom interpret function', fakeAsync(() => {
        const fn = build(() =>
            AsyncValidators.unique({
                endpoint: '/api/check',
                interpret: r => (r as { taken?: boolean }).taken === true,
            })
        );
        const out = validate(fn, createAbstractControlSpy('alice'));
        tick(300);
        httpMock.expectOne(r => r.url === '/api/check').flush({ taken: true });

        expect(out.value).toEqual({ unique: true });
    }));
});
