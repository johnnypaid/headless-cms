import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class SiteInfoService {

  endpoint = GlobalConstants.apiURL + 'site-info?token=' + GlobalConstants.apiToken;

  constructor(private httpClient: HttpClient) { }

  getSiteInfo() {
    return this.httpClient.get(this.endpoint);
  }
}
