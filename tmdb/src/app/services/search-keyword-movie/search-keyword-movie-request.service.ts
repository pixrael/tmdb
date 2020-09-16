import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { baseUrl, apiKey } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class SearchKeywordMovieRequestService {

  constructor(private httpClient: HttpClient) { }

  searchKeyword(keyword: string): Observable<any> {
    return this.httpClient.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${keyword}`);
  }
}
