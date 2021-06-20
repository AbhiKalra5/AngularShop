import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Models';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  product!: Product;
  ngOnInit(): void {
    const productId: string = this.activatedRoute.snapshot.params.pid;
    this.productService.getProductWithId(productId).subscribe((data) => {
      this.product = data[0];
    });
  }
  addProductToCart(): void {
    this.cartService.addProduct(this.product);
    this.snackBar
      .open('Product Added To Cart', 'Go to Cart', { duration: 4000 })
      .onAction()
      .subscribe(() => {
        this.router.navigate(['/cart']);
      });
  }
}
