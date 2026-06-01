import { HttpResponse, provideHttpClient } from '@angular/common/http';
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

    const ok = { status: 200, statusText: 'OK' };
    const notFound = { status: 404, statusText: 'Not Found' };

    it('unique - valid when the lookup returns 404 (free)', fakeAsync(() => {
        const out = validate(
            build(() => AsyncValidators.unique({ endpoint: '/api/check' })),
            createAbstractControlSpy('alice')
        );
        tick(300);
        httpMock.expectOne(r => r.url === '/api/check').flush(null, notFound);

        expect(out.value).toBeNull();
    }));

    it('unique - invalid when the lookup returns 2xx (taken)', fakeAsync(() => {
        const out = validate(
            build(() => AsyncValidators.unique({ endpoint: '/api/check' })),
            createAbstractControlSpy('bob')
        );
        tick(300);
        httpMock.expectOne(r => r.url === '/api/check').flush({}, ok);

        expect(out.value).toEqual({ unique: true });
    }));

    it('unique - undecided on a 5xx resolves to valid', fakeAsync(() => {
        const out = validate(
            build(() => AsyncValidators.unique({ endpoint: '/api/check' })),
            createAbstractControlSpy('bob')
        );
        tick(300);
        httpMock.expectOne(r => r.url === '/api/check').flush(null, { status: 500, statusText: 'Server Error' });

        expect(out.value).toBeNull();
    }));

    it('exists - valid on 2xx, invalid on 404', fakeAsync(() => {
        const okOut = validate(
            build(() => AsyncValidators.exists({ endpoint: '/api/exists' })),
            createAbstractControlSpy('a')
        );
        tick(300);
        httpMock.expectOne(r => r.url === '/api/exists').flush({}, ok);

        expect(okOut.value).toBeNull();

        const missOut = validate(
            build(() => AsyncValidators.exists({ endpoint: '/api/exists' })),
            createAbstractControlSpy('b')
        );
        tick(300);
        httpMock.expectOne(r => r.url === '/api/exists').flush(null, notFound);

        expect(missOut.value).toEqual({ exists: true });
    }));

    it('remoteValidation - valid on 2xx, invalid on 4xx', fakeAsync(() => {
        const okOut = validate(
            build(() => AsyncValidators.remoteValidation({ endpoint: '/api/v' })),
            createAbstractControlSpy('a')
        );
        tick(300);
        httpMock.expectOne(r => r.url === '/api/v').flush({}, ok);

        expect(okOut.value).toBeNull();

        const badOut = validate(
            build(() => AsyncValidators.remoteValidation({ endpoint: '/api/v' })),
            createAbstractControlSpy('b')
        );
        tick(300);
        httpMock.expectOne(r => r.url === '/api/v').flush(null, { status: 422, statusText: 'Unprocessable Entity' });

        expect(badOut.value).toEqual({ remoteValidation: true });
    }));

    it('uniqueExcept - sends the except id and is valid on 404', fakeAsync(() => {
        const out = validate(
            build(() => AsyncValidators.uniqueExcept(42, { endpoint: '/api/check' })),
            createAbstractControlSpy('eve')
        );
        tick(300);
        const req = httpMock.expectOne(r => r.url === '/api/check');

        expect(req.request.params.get('except')).toBe('42');
        req.flush(null, notFound);

        expect(out.value).toBeNull();
    }));

    it('GET sends the value as a query param', fakeAsync(() => {
        validate(
            build(() => AsyncValidators.unique({ endpoint: '/api/check', paramName: 'username' })),
            createAbstractControlSpy('carol')
        );
        tick(300);
        const req = httpMock.expectOne(r => r.url === '/api/check');

        expect(req.request.params.get('username')).toBe('carol');
        req.flush(null, notFound);
    }));

    it('POST sends a JSON body', fakeAsync(() => {
        validate(
            build(() => AsyncValidators.unique({ endpoint: '/api/check', method: 'POST', paramName: 'username' })),
            createAbstractControlSpy('dave')
        );
        tick(300);
        const req = httpMock.expectOne('/api/check');

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ username: 'dave' });
        req.flush(null, notFound);
    }));

    it('short-circuits empty values without a request', fakeAsync(() => {
        const out = validate(
            build(() => AsyncValidators.unique({ endpoint: '/api/check' })),
            createAbstractControlSpy('')
        );
        tick(300);
        httpMock.expectNone(r => r.url === '/api/check');

        expect(out.value).toBeNull();
    }));

    it('a custom resolve fully overrides the default and can read a nested body', fakeAsync(() => {
        const fn = build(() =>
            AsyncValidators.unique({
                endpoint: '/api/check',
                resolve: res =>
                    res instanceof HttpResponse
                        ? (res.body as { data: { taken: boolean } }).data.taken === false
                        : null,
            })
        );
        const out = validate(fn, createAbstractControlSpy('alice'));
        tick(300);
        // Backend always returns 200 with a nested flag; default status rule would say "taken", custom says free.
        httpMock.expectOne(r => r.url === '/api/check').flush({ data: { taken: false } }, ok);

        expect(out.value).toBeNull();
    }));
});
