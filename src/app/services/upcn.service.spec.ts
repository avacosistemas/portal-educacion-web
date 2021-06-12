import { TestBed } from '@angular/core/testing';

import { UpcnService } from './upcn.service';

describe('UpcnService', () => {
  let service: UpcnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
