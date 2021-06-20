import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Models';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  products: Product[] = [];
  filterValue = '';
  filteredProducts: Product[] = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      const queryParam: string = param.query;
      this.productService
        .getProductAfterSearching(queryParam.toLowerCase())
        .subscribe((data: Product[]) => {
          this.products = data;
          this.filteredProducts = data;
        });
    });
  }
  onFilterChanges(value: string): void {
    if (value && value.length < 3) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    }
  }
  addProductToCart(index: any): void {
    index = +index;
    this.cartService.addProduct(this.filteredProducts[index]);
    this.snackBar
      .open('Product Added To Cart', 'Go to Cart', { duration: 4000 })
      .onAction()
      .subscribe(() => {
        this.router.navigate(['/cart']);
      });
  }
}
