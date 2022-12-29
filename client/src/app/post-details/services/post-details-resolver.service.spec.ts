import { TestBed } from '@angular/core/testing';

import { PostDetailsResolverService } from './post-details-resolver.service';

describe('PostDetailsResolverService', () => {
  let service: PostDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
