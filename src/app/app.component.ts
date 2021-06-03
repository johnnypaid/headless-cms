import { Component, Inject, INJECTOR, OnInit } from '@angular/core';
import{ GlobalConstants } from './common/global-constants';
import { Title, Meta} from '@angular/platform-browser'
import { SiteInfoService } from './service/site-info.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = "";
  metas: any;
  favIcon: HTMLLinkElement = document.querySelector('#favIcon');

  constructor(
    @Inject(DOCUMENT)private dom: Document,
    private titleService: Title, 
    private metaService: Meta, 
    private pageTags: SiteInfoService) {
    // console.log(GlobalConstants.apiURL);
    // console.log(GlobalConstants.apiToken);
  }

  ngOnInit() {
    this.pageTags.getSiteInfo()
      .subscribe(data => {
        this.metas = data;
        this.title = this.metas.site_info.title;
        this.dom.documentElement.lang = this.metas.site_info._locale; 
        this.favIcon.href = this.metas.site_info.meta_icon_url;
        this.favIcon.type = this.metas.site_info.meta_icon_type;
        this.titleService.setTitle(this.title);
        this.metaService.addTags([
          { name: 'meta_title', content: this.title},
          { name: 'meta_descrition', content: this.metas.site_info.meta_description}
        ]);
        //console.log(this.metas);
      });
  }
}
