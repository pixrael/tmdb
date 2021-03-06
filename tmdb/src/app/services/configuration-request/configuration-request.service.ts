import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { baseUrl, apiKey } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationRequestService {

  constructor(private httpClient: HttpClient) { }

  getConfigurations(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/configuration?api_key=${apiKey}`);
  }
}
