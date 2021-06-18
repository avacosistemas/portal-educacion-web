import { TestBed } from '@angular/core/testing';

import { ModalhomeService } from './modalhome.service';

describe('ModalhomeService', () => {
  let service: ModalhomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalhomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
