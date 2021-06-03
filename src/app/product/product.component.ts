import { Component, OnInit} from '@angular/core';
import { ContentService } from '../service/content.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productData = [];
  prodList = [];
  prodContent = [];
  arrCont = [];
  mainCont = [];
  listOrder = '';
  searchProd = false;

  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [10, 1];

  constructor(private productService: ContentService) { }

  ngOnInit(): void {
    this.productData = [];
    this.mainCont = [];
    this.productData.push(this.productService.getPageContent());
    this.prodList = this.productData[0].products;
    this.listOrder = this.productData[0].paginator.direction;

    for (let i = 0; i < this.prodList.length; i++) {
      this.prodContent.push(this.prodList[i].product_images);
      this.arrCont = this.arrCont.concat(this.prodList[i].product_images);
      this.mainCont.push(Object.assign(this.arrCont[i], this.prodList[i]));
    }
    this.sort(this.listOrder);
  }

  onTableDataChange(event){
    this.page = event;
    this.mainCont = this.mainCont;
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.mainCont  = this.mainCont;
  }

  sort(data) {
    this.mainCont.sort((a, b) => {
      const fa = a.name.toLowerCase();
      const fb = b.name.toLowerCase();

      switch (data){
        case 'DESC': {
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          break;
        }
        case 'ASC': {
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            break;
        }
        default: {
          return 0;
        }
      }
    });
  }

  searchProduct(prodKey) {
    if (prodKey !== '') {
      this.productData = [];
      this.mainCont = [];
      this.productService.searcProduct(prodKey)
      .subscribe(resdata => {
        this.productData.push(resdata);
        this.prodList = this.productData[0].products;
        this.listOrder = this.productData[0].paginator.direction;

        for (let i = 0; i < this.prodList.length; i++) {
          this.prodContent.push(this.prodList[i].product_images);
          this.arrCont = this.arrCont.concat(this.prodList[i].product_images);
          this.mainCont.push(Object.assign(this.arrCont[i], this.prodList[i]));
        }
        this.sort(this.listOrder);
        // console.log(this.productData[0].products);
      }, error => {
        console.log(error.message);
      });
    } else {
      this.ngOnInit();
    }
  }

  onSubmit(f) {
    console.log(f.form.controls.myselect.value);

    if (f.form.controls.myselect.value !== '' && f.form.controls.prodKey.value === '') {
      console.log('category search!');
      switch (f.form.controls.myselect.value){
        case 1: {
         // console.log(f.form.controls.myselect.value);
          break;
        }
        case 2: {
         // console.log(f.form.controls.myselect.value);
          break;
        }
      }
    } else if (f.form.controls.myselect.value === '' && f.form.controls.prodKey.value !== ''){
      this.searchProduct(f.form.controls.prodKey.value);
      // console.log(f.form.controls.prodKey.value);
    } else {
      this.ngOnInit();
    }
  }
}
