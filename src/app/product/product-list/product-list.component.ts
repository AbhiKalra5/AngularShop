import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  products: Product[] = [];
  filterValue = '';
  filteredProducts: Product[] = [];
  ngOnInit(): void {
    this.products = this.route.snapshot.data.products;
    this.filteredProducts = this.products;
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
