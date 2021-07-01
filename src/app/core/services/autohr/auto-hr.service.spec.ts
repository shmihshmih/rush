import { TestBed } from '@angular/core/testing';

import { AutoHRService } from './auto-hr.service';

describe('AutoHRService', () => {
  let service: AutoHRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoHRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
