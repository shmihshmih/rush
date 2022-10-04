import { TestBed } from '@angular/core/testing';

import { TotalSpinnerService } from './total-spinner.service';

describe('TotalSpinnerService', () => {
  let service: TotalSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
