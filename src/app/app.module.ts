import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {
  CommonImportModule,
  HttpLoaderFactory,
} from './common-imports/common-imports.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './product/category/category.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchListComponent } from './product/search-list/search-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProductListComponent,
    ProductDetailComponent,
    CategoryComponent,
    PageNotFoundComponent,
    SearchListComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CommonImportModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
