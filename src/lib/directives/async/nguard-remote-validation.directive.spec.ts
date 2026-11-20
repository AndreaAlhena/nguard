import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { Observable } from 'rxjs';
import { NguardRemoteValidationDirective } from './nguard-remote-validation.directive';
import type { AsyncValidatorConfig } from '../../types/async-validator-config.type';
import { createAbstractControlSpy } from '../../../testing/helpers/control-spy.helper';

@Component({
  imports: [NguardRemoteValidationDirective],
  standalone: true,
  template: '<div [nguardRemoteValidation]="config"></div>',
})
class HostComponent {
  public config: AsyncValidatorConfig = { endpoint: '/api/v' };
}

describe('NguardRemoteValidationDirective', () => {
  let directive: NguardRemoteValidationDirective;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement
      .query(By.directive(NguardRemoteValidationDirective))
      .injector.get(NguardRemoteValidationDirective);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should fail when the endpoint returns a 4xx', fakeAsync(() => {
    let result: unknown = 'unset';
    (
      directive.validate(createAbstractControlSpy('z')) as Observable<unknown>
    ).subscribe((r) => (result = r));
    tick(300);
    httpMock
      .expectOne((r) => r.url === '/api/v')
      .flush(null, { status: 422, statusText: 'Unprocessable Entity' });

    expect(result).toEqual({ remoteValidation: true });
  }));
});
