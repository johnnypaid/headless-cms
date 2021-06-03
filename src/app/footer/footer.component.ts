import { Component, OnInit } from '@angular/core';
import { FooterService } from '../service/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerData: any;
  copyRight = '';
  footerLinks = [];
  footerClass = '';
  errSpinner = false;


  constructor(private data: FooterService) { }

  ngOnInit(): void {
    this.errSpinner = false;
    this.footerData = this.data.getFooter()
      .subscribe(resdata => {
        this.footerData = resdata;
        this.copyRight = this.footerData.footer.copyright;
        this.footerLinks = this.footerData.footer.links;
        this.footerClass = this.footerData.footer.class;
      }, error => {
        console.log(error.message);
        this.errSpinner = true;
      });
  }

}
