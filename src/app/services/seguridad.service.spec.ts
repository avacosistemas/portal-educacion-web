import { TestBed } from '@angular/core/testing';

import { SeguridadService } from './seguridad.service';

describe('AuthenticateService', () => {
  let service: SeguridadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguridadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
