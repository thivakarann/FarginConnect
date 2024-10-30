import { TestBed } from '@angular/core/testing';

import { FarginServiceService } from './fargin-service.service';

describe('FarginServiceService', () => {
  let service: FarginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
