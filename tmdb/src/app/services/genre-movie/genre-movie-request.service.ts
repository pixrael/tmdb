import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { baseUrl, apiKey } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class GenreMovieRequestService {

  constructor(private httpClient: HttpClient) { }

  searchGenres(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`);
  }
}
