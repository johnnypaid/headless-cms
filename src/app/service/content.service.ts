import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private sections: any;

  constructor(
    private httpClient: HttpClient) { }

  getContent(page: any) {
    if (page !== 'products') {
      if (page === 'brands') {
        console.log('brands data..');
        // return this.httpClient.get(GlobalConstants.apiURL + page + '?token=' + GlobalConstants.apiToken);
      } else {
        return this.httpClient.get(GlobalConstants.apiURL + 'page/' + page + '?token=' + GlobalConstants.apiToken);
      }
    } else {
      return this.httpClient.get(GlobalConstants.apiURL + page + '?token=' + GlobalConstants.apiToken);
    }
  }

  getInnerContent(page: any) {
    // console.log(page);
    return this.httpClient.get(GlobalConstants.apiURL + 'products/' + page.item + '?token=' + GlobalConstants.apiToken);
  }

  // recive data from main content component
  setPageContent(data) {
    this.sections = data;
  }

  getPageContent() {
    return this.sections;
  }

  searcProduct(keyword) {
    return this.httpClient.get(GlobalConstants.apiURL + 'products/search?keywords=' + keyword + '&token=' + GlobalConstants.apiToken);
  }

  getCategory(){
    return this.httpClient.get(GlobalConstants.apiURL + 'categories?token=' + GlobalConstants.apiToken);
  }

  searchCategory(id) {
    return this.httpClient.get(GlobalConstants.apiURL + ' products/category/' + id + '?token=' + GlobalConstants.apiToken);
  }
}
