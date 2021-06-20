import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Models';
import { ProductService } from 'src/app/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolver implements Resolve<Category> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Category | Observable<Category> {
    return this.productService.getAllCategories();
  }
}
