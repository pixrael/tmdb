import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationRequestService {

  constructor(private httpClient: HttpClient) { }

  getConfigurations(): Observable<any> {
    return this.httpClient.get('https://api.themoviedb.org/3/configuration?api_key=314dd2fd158d1a156815bfda6f2037c3');
  }
}
