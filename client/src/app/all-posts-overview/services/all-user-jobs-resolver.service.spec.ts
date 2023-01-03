import { TestBed } from '@angular/core/testing';

import { AllUserJobsResolverService } from './all-user-jobs-resolver.service';

describe('AllUserJobsResolverService', () => {
  let service: AllUserJobsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllUserJobsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
