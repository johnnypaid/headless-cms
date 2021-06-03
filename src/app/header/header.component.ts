import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../service/header.service';
import { ActivatedRoute } from '@angular/router';
import { LanguagesService } from '../service/languages.service';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerData: any;
  headerLinks = [];
  monitorLinks = [];
  headerName = [];
  menuClass = '';
  headerLogo = '';
  loadingSpinner = false;
  pageName = '';
  linkName = '';
  isCollapsed: boolean;
  language: any;
  langType = [];
  langIcon = '';
  langCode = '';

  constructor(
    private data: HeaderService,
    private lang: LanguagesService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadingSpinner = false;
    this.headerData = this.data.getHeader()
      .subscribe( resdata => {
        this.headerData = resdata;
        this.headerLinks = this.headerData.header.links;
       // console.log(this.headerLinks);
        this.menuClass = this.headerData.header.class;
        this.headerLogo = this.headerData.header.brand_image_url;
        this.headerName = this.headerData.header.links.name;

       // GlobalConstants.pages.push(this.headerLinks);
        this.checkRoute(this.headerLinks);

      }, error => {
        console.log(error.message);
        this.loadingSpinner = true;
      });
    this.isCollapsed = true;

    this.language = this.lang.getLang()
        .subscribe( langdata => {
          this.langType.push(langdata);
          this.langIcon = this.langType[0].languages[0].icon;
          this.langCode = this.langType[0].languages[0].code;
          // console.log(this.langType[0].languages[0].code);
        }, error => {
          console.log(error.message);
        });
  }

  checkRoute(links) {
    // console.log(links)
    // tslint:disable-next-line:prefer-for-of
    for ( let i = 0; i < links.length; i++) {
      GlobalConstants.pages.push(links[i].name);
    }
  }
}
