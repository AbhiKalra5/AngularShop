import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cart, Order } from 'src/app/models/Models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  order = new Order();
  ngOnInit(): void {
    this.order = this.cartService.fetchLatestOrder();
    if (this.order == null) {
      this.router.navigate(['/category']);
      this.snackBar.open('No Order Found', 'ok', { duration: 2000 });
    }
  }
}
