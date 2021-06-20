import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}
  loggedIn = false;
  isHamburgerExpanded = false;
  searchExpanded = false;
  searchFocused = false;
  searchText = '';
  avatarImage = '/assets/images/fallback-female.jpg';
  cartCount = 0;
  changeSearchState(): void {
    this.searchFocused = !this.searchFocused;
  }
  toggleExpandedHamburger(): void {
    this.isHamburgerExpanded = !this.isHamburgerExpanded;
  }
  searchShrink(): void {
    this.searchExpanded = false;
  }
  searchExpand(): void {
    this.searchExpanded = true;
  }
  getMobileSearchClasses(): string {
    if (this.searchFocused) {
      return 'search-expanded mobile-hidden';
    }
    return '';
  }
  searchSomething(): void {
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchText },
    });
  }
  waitForEnter(value: any): void {
    if (value.code === 'Enter') {
      this.searchSomething();
    }
  }
  logoutUser(): void {
    this.authService.logoutUser();
    this.cartService.fetchCart();
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((data) => {
      if (data) {
        this.cartCount = +data.totalProducts;
      } else {
        this.cartCount = 0;
      }
    });
    this.authService.checkIfLoggedInObservable().subscribe((data) => {
      if (data === 'true') {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
    if (this.authService.checkIfLoggedIn() === 'true') {
      this.loggedIn = true;
    }
    if (this.cartService.fetchCart()) {
      this.cartCount = +this.cartService.fetchCart().totalProducts;
    }
  }
}
