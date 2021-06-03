import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from './service/header.service';
import { HeaderComponent } from './header/header.component';
import { ContentService } from './service/content.service';
import { FooterComponent } from './footer/footer.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainContent } from './common/main-content';
import { CarouselComponent } from './carousel/carousel.component';
import { ArticleComponent } from './article/article.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { ContactService } from './service/contact.service';
import { ProductComponent } from './product/product.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { BrandsComponent } from './brands/brands.component';


const routes: Routes = [
  {path: ':name', component: MainContentComponent},
  {path: ':name/:item', component: MainContentComponent},
  {path: ':name/:item/:id', component: MainContentComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
    CarouselComponent,
    ArticleComponent,
    MainContent,
    ContactComponent,
    ProductComponent,
    ProductViewComponent,
    PageNotFoundComponent,
    ProductCategoryComponent,
    BrandsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbCollapseModule
  ],
  providers: [
    HeaderService,
    ContentService,
    MainContent,
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
