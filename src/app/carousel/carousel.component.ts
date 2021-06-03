import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../service/content.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  caroData: any;
  caroSection = [];
  caroContents = [];
  caroExtracted = [];
  currentPage = '';

  constructor(
    private caroContent: ContentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap
      .subscribe(params => {
        const name = params.get('name');
        this.currentPage = name;
        this.getCarro(this.currentPage);
      });
  }

  getCarro(page) {
    // console.log(page);

    this.caroContent.getContent(page)
      .subscribe(resdata => {
        this.caroData = resdata;
        if (page !== 'products') {
          this.caroSection = this.caroData.page.sections;
          this.extractSection(this.caroSection);
        }
        // console.log(this.caroSection);
      });
  }

  extractSection(data) {
    for (let i = 0; i < data.length; i++) {
      // console.log(sec.name)
      if (data[i].name === 'Carousel') {
        this.caroContents.push(data[i]);
        this.caroExtracted = this.caroContents[i].contents;

        // console.log(this.caroExtracted);
      }
    }
  }

}
