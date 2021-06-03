import { Component, OnInit } from '@angular/core';
import { ContentService } from '../service/content.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  viewProduct = [];
  // tslint:disable-next-line:variable-name
  img_url = '';
  prodName = '';
  currentRate = 8;

  constructor(private viewProductData: ContentService) { }

  ngOnInit(): void {
    this.viewProduct.push(this.viewProductData.getPageContent());
    this.img_url = this.viewProduct[0].product.product_images[0].image_url;
    this.prodName = this.viewProduct[0].product.name;
    // console.log(this.img_url);
    // console.log(this.viewProduct);
  }

}
