import { TestBed } from '@angular/core/testing';

import { AllPostsResolverService } from './all-posts-resolver.service';

describe('AllPostsResolverService', () => {
  let service: AllPostsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllPostsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
