import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchKeywordMovieRequestService {

  constructor(private httpClient: HttpClient) { }

  searchKeyword(keyword: string): Observable<any> {
    return this.httpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=314dd2fd158d1a156815bfda6f2037c3&query=${keyword}`);
  }
}
