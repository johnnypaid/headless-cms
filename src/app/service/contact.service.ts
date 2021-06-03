import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  endpoint = GlobalConstants.apiURL + 'submit-contact-form?token=' + GlobalConstants.apiToken;

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  sendContact(data) {
    return this.httpClient.post(this.endpoint, data);
  }

}
