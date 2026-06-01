import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NguardUniqueExceptDirective } from './nguard-unique-except.directive';
import { AsyncValidatorConfig } from '../../types/async-validator-config.type';
import { createAbstractControlSpy } from '../../utils/test.utils';

@Component({
    imports: [NguardUniqueExceptDirective],
    standalone: true,
    template: '<div [nguardUniqueExcept]="config" [nguardUniqueExceptId]="42"></div>',
})
class HostComponent {
    public config: AsyncValidatorConfig = { endpoint: '/api/check' };
}

describe('NguardUniqueExceptDirective', () => {
    let directive: NguardUniqueExceptDirective;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HostComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        directive = fixture.debugElement
            .query(By.directive(NguardUniqueExceptDirective))
            .injector.get(NguardUniqueExceptDirective);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should send the except id and pass on 404 (free)', fakeAsync(() => {
        let result: unknown = 'unset';
        (directive.validate(createAbstractControlSpy('eve')) as Observable<unknown>).subscribe(r => (result = r));
        tick(300);
        const req = httpMock.expectOne(r => r.url === '/api/check');

        expect(req.request.params.get('except')).toBe('42');
        req.flush(null, { status: 404, statusText: 'Not Found' });

        expect(result).toBeNull();
    }));
});
