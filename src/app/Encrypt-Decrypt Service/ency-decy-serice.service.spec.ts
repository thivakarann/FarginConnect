import { TestBed } from '@angular/core/testing';

import { EncyDecySericeService } from './ency-decy-serice.service';

describe('EncyDecySericeService', () => {
  let service: EncyDecySericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncyDecySericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
