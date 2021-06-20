import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  username = '';
  password = '';
  showSpinner = false;
  ngOnInit(): void {
    if (this.authService.checkIfLoggedIn() === 'true') {
      this.snackBar.open('You are already logged in!', 'Got it!', {
        duration: 2000,
      });
      this.router.navigate(['/']);
    }
  }
  login(): void {
    this.showSpinner = true;
    this.authService
      .loginUser(this.username, this.password)
      .pipe(delay(1000))
      .subscribe((data) => {
        if (data) {
          this.snackBar.open('Login Successful', 'ok', { duration: 2000 });
          this.router.navigate(['/']);
        } else {
          this.snackBar.open('Login Failed', 'ok', { duration: 2000 });
        }
        this.showSpinner = false;
      });
  }
  waitForEnter(value: any): void {
    if (value.code === 'Enter') {
      this.login();
    }
  }
}
