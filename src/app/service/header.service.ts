import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  endpoint = GlobalConstants.apiURL + 'header?token=' + GlobalConstants.apiToken;

  constructor(private httpClient: HttpClient) { }

  getHeader() {
    return this.httpClient.get(this.endpoint);
  }
}
