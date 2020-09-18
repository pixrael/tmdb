import { TestBed } from '@angular/core/testing';

import { PosterMovieRequestService } from './poster-movie-request.service';

describe('PosterMovieRequestService', () => {
  let service: PosterMovieRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosterMovieRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
