import { TestBed } from '@angular/core/testing';

import { SearchKeywordMovieRequestService } from './search-keyword-movie-request.service';

describe('SearchKeywordMovieRequestService', () => {
  let service: SearchKeywordMovieRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchKeywordMovieRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
