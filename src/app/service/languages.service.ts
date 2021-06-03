import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  endpoint = GlobalConstants.apiURL + 'available-languages?token=' + GlobalConstants.apiToken;

  constructor(private httpClient: HttpClient) { }

  getLang() {
    return this.httpClient.get(this.endpoint);
  }
}
