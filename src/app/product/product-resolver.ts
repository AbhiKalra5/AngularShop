import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Product } from '../models/Models';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> {
    const id = route.params.id;
    return this.productService.getProductsFromCategory(id);
  }
}
