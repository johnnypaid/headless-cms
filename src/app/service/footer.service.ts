import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  endpoint = GlobalConstants.apiURL + 'footer?token=' + GlobalConstants.apiToken;

  constructor(private httpClient: HttpClient) { }

  getFooter() {
    return this.httpClient.get(this.endpoint);
  }
}
