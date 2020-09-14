import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  constructor(private httpClient: HttpClient) { }

  getConfigurations() {
    return this.httpClient.get('https://api.themoviedb.org/3/configuration?api_key=314dd2fd158d1a156815bfda6f2037c3');
  }

}
