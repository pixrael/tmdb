import { TestBed } from '@angular/core/testing';

import { GenreMovieRequestService } from './genre-movie-request.service';

describe('GenreMovieRequestService', () => {
  let service: GenreMovieRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreMovieRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
