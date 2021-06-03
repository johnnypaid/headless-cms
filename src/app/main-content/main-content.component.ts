import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../service/content.service';
import { MainContent } from '../common/main-content';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  pageData: any;
  contentName = [];
  pageSections = [];
  currentPage = '';
  pageTitle = '';

  paramObj = [];
  pages = [];
  numkey: number;

  constructor(
    private route: ActivatedRoute,
    private serviceCont: ContentService,
    private page: MainContent) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {

        // start test here
        this.paramObj = [];
        this.pages = [];
        this.paramObj.push(params);
        this.pages.push(this.paramObj[0].params);
        // console.log(Object.keys(this.pages[0]).length);
        // console.log(this.pages[0]);
        this.numkey = Object.keys(this.pages[0]).length;

        switch (this.numkey){
          case 1: {
           const name = params.get('name');
           console.log(name);
           this.currentPage = name;
           localStorage.setItem(this.currentPage, name);
           this.changeContent();
           break;
          }
          case 2: {
            console.log(this.pages[0]);
            if (this.pages[0].item === 'category') {
               this.innerContent(this.pages[0]);
            } else {
               this.innerContent(this.pages[0]);
            }
          }
        }
      });
      // console.log(GlobalConstants.pages);
  }

  changeContent() {
    console.log(GlobalConstants.pages.length);
    console.log(this.currentPage);
    if (this.currentPage === 'brands') {
      console.log('Do something for brands');
      this.pageTitle = 'Brands';
      this.pageSections = [{code: 'Brands', name: 'Brands'}];
    } else {
      this.pageData = this.serviceCont.getContent(this.currentPage)
      .subscribe(resData => {
        this.pageData = resData;
        if (this.currentPage !== 'products') {
          this.pageSections = this.pageData.page.sections;
          this.serviceCont.setPageContent(this.pageSections); // send page sections to content service
          this.pageTitle = this.pageData.page.title;
          this.contentName = [];
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.pageSections.length; i++) {
            this.contentName.push(this.pageSections[i].name);
          }
        } else {
          this.pageTitle = 'Products';
          this.pageSections = [{code: 'Products', name: 'Products'}];
          this.serviceCont.setPageContent(this.pageData); // send page data to content service
        }
        // console.log(this.pageSections);
       // console.log(this.pageData);
      });
    }
  }

  innerContent(page: any) {
    // console.log(page.name)
    if (page.item === 'category'){
      console.log(page.item);
      this.pageData = this.serviceCont.getCategory()
        .subscribe(resdata => {
          // get the category service here..
        });

      this.pageTitle = 'Product Category';
      this.pageSections = [{code: 'Product Category', name: 'Product Category'}];
    } else {
      this.pageData = this.serviceCont.getInnerContent(page)
      .subscribe( resdata => {
        this.pageData = resdata;
        // console.log(this.pageData);
        this.pageTitle = '';
        this.pageSections = [{code: 'View Product', name: 'View Product'}];
        this.serviceCont.setPageContent(this.pageData); // send page data to content service
      });
    }
  }
}
