import { TestBed } from '@angular/core/testing';

import { NguardService } from './nguard.service';

describe('NguardService', () => {
  let service: NguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
