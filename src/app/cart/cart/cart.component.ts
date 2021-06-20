import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, Cart } from 'src/app/models/Models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}
  cart: Cart = new Cart();
  address: Address = new Address();
  ngOnInit(): void {
    this.cart = this.cartService.fetchCart();
    if (this.cart === undefined || this.cart === null) {
      this.router.navigate(['/category']);
      this.snackBar.open('First Add Items to Cart', 'ok', { duration: 2000 });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  removeProduct(index: any): void {
    this.cartService.removeProduct(+index);
  }
  formSubmitted(value: any): void {
    if (
      value.form.controls['PostalCd.'].value.length < 6 ||
      value.form.controls['PostalCd.'].value <= 0
    ) {
      value.form.controls['PostalCd.'].status = 'INVALID';
    }
    if (value.form.valid) {
      this.convertToOrder();
    } else {
      this.snackBar.open('Invalid Address Values', 'ok', { duration: 2000 });
    }
  }
  convertToOrder(): void {
    this.cartService.updateCartWithAddress(this.address);

    this.cartService.convertToOrder();
    this.router.navigate(['checkout'], {
      relativeTo: this.activatedRoute,
    });
  }
}
