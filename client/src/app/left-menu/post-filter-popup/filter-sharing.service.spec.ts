import { TestBed } from '@angular/core/testing';

import { FilterSharingService } from './filter-sharing.service';

describe('FilterSharingService', () => {
  let service: FilterSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
