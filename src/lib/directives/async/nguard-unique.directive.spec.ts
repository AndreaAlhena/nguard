import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NguardUniqueDirective } from './nguard-unique.directive';
import { AsyncValidatorConfig } from '../../types/async-validator-config.type';
import { createAbstractControlSpy } from '../../utils/test.utils';

@Component({
    imports: [NguardUniqueDirective],
    standalone: true,
    template: '<div [nguardUnique]="config"></div>',
})
class HostComponent {
    public config: AsyncValidatorConfig = { endpoint: '/api/check' };
}

describe('NguardUniqueDirective', () => {
    let directive: NguardUniqueDirective;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HostComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        directive = fixture.debugElement.query(By.directive(NguardUniqueDirective)).injector.get(NguardUniqueDirective);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should fail when the value exists', fakeAsync(() => {
        let result: unknown = 'unset';
        (directive.validate(createAbstractControlSpy('bob')) as Observable<unknown>).subscribe(r => (result = r));
        tick(300);
        httpMock.expectOne(r => r.url === '/api/check').flush({ exists: true });

        expect(result).toEqual({ unique: true });
    }));
});
