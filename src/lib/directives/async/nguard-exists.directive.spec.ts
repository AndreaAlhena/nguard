import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NguardExistsDirective } from './nguard-exists.directive';
import { AsyncValidatorConfig } from '../../types/async-validator-config.type';
import { createAbstractControlSpy } from '../../utils/test.utils';

@Component({
    imports: [NguardExistsDirective],
    standalone: true,
    template: '<div [nguardExists]="config"></div>',
})
class HostComponent {
    public config: AsyncValidatorConfig = { endpoint: '/api/exists' };
}

describe('NguardExistsDirective', () => {
    let directive: NguardExistsDirective;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HostComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        directive = fixture.debugElement.query(By.directive(NguardExistsDirective)).injector.get(NguardExistsDirective);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should fail when the lookup returns 404 (not found)', fakeAsync(() => {
        let result: unknown = 'unset';
        (directive.validate(createAbstractControlSpy('x')) as Observable<unknown>).subscribe(r => (result = r));
        tick(300);
        httpMock.expectOne(r => r.url === '/api/exists').flush(null, { status: 404, statusText: 'Not Found' });

        expect(result).toEqual({ exists: true });
    }));
});
