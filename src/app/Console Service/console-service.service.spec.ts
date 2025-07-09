import { TestBed } from '@angular/core/testing';

import { ConsoleServiceService } from './console-service.service';

describe('ConsoleServiceService', () => {
  let service: ConsoleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
