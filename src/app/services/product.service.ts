import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Category, Product } from '../models/Models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  products: Product[] = [];
  categories: Category[] = [];
  getAllProducts(): Observable<any> {
    const productUrl = `data/product-data.json`;
    return this.httpClient.get(productUrl).pipe(
      tap((data: any) => (this.products = data.products)),
      map((data: any) => {
        return data.products;
      })
    );
  }
  getProductWithId(pid: string): Observable<any> {
    if (this.products && this.products.length === 0) {
      return this.getAllProducts().pipe(
        map((data: Product[]) => {
          data = data.filter(
            (product) =>
              product.pid.toLowerCase().indexOf(pid.toLowerCase()) > -1
          );
          return data;
        })
      );
    }
    return of(
      this.products.filter(
        (product) => product.pid.toLowerCase().indexOf(pid.toLowerCase()) > -1
      )
    );
  }
  getAllCategories(): Observable<any> {
    const categoryUrl = 'data/category-data.json';
    return this.httpClient.get(categoryUrl).pipe(
      tap((data: any) => {
        this.categories = data.categories;
      }),
      map((data: any) => {
        return data.categories;
      })
    );
  }
  getProductsFromCategory(categoryCode: string): Observable<Product[]> {
    if (this.products && this.products.length === 0) {
      return this.getAllProducts().pipe(
        map((data: any) => {
          return this.products.filter(
            (product) =>
              product.categoryid.toLowerCase() === categoryCode.toLowerCase()
          );
        })
      );
    }
    if (categoryCode === 'root') {
      return of(this.products);
    } else {
      return of(
        this.products.filter(
          (product) =>
            product.categoryid.toLowerCase() === categoryCode.toLowerCase()
        )
      );
    }
  }
  getProductAfterSearching(queryString: string): Observable<Product[]> {
    if (this.products && this.products.length === 0) {
      return this.getAllProducts().pipe(
        map((data: any) => {
          return this.products.filter(
            (product) => product.name.toLowerCase().indexOf(queryString) > -1
          );
        })
      );
    } else {
      return of(
        this.products.filter(
          (product) => product.name.toLowerCase().indexOf(queryString) > -1
        )
      );
    }
  }
}
