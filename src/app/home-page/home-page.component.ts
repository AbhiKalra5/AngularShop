import { Component, OnInit } from '@angular/core';
import { User } from '../models/Models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private authService: AuthService) {}
  customerName = '';
  param = { value: this.customerName !== '' ? this.customerName : 'Guest' };
  ngOnInit(): void {
    this.authService.getLoggedInUserNameObservable().subscribe((data) => {
      if (data) {
        this.customerName = data;
      } else {
        this.customerName = '';
      }
      this.param = {
        value: this.customerName !== '' ? this.customerName : 'Guest',
      };
    });
    if (this.authService.checkIfLoggedIn() === 'true') {
      let user: User = new User();
      user = this.authService.getLoggedInUserInfo();
      this.customerName = user.name;
    } else {
      this.customerName = '';
    }
    this.param = {
      value: this.customerName !== '' ? this.customerName : 'Guest',
    };
  }
}
