import { TestBed } from '@angular/core/testing';

import { ConfigurationRequestService } from './configuration-request.service';

describe('ConfigurationRequestService', () => {
  let service: ConfigurationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
