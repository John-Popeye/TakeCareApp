import { TestBed } from '@angular/core/testing';

import { PostRestServiceService } from './post-rest.service';

describe('PostRestServiceService', () => {
  let service: PostRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
