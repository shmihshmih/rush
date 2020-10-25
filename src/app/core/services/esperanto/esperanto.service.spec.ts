import { TestBed } from '@angular/core/testing';

import { EsperantoService } from './esperanto.service';

describe('EsperantoService', () => {
  let service: EsperantoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsperantoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
