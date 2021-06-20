import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../models/Models';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userList: User[] = [];
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private cartService: CartService
  ) {}
  loginUser(username: string, password: string): Observable<boolean> {
    return this.httpClient.get('data/user-data.json').pipe(
      map((data: any) => {
        this.userList = data.users;
        const newData = this.userList.filter(
          (user) =>
            user['email-id'].toLowerCase().indexOf(username.toLowerCase()) >
              -1 && user.password.toLowerCase() === password.toLowerCase()
        );
        if (newData.length === 1) {
          this.saveUserDetailsToLocalStorage(newData[0]);
          return true;
        }
        return false;
      })
    );
  }
  logoutUser(): void {
    if (this.localStorageService.retrieve('isLoggedIn') === 'true') {
      this.removeUserDetailsFromLocalStorage();
      this.cartService.removeCart();
      this.cartService.removeOrders();
    }
  }
  checkIfLoggedInObservable(): Observable<any> {
    return this.localStorageService.observe('isLoggedIn');
  }
  checkIfLoggedIn(): any {
    return this.localStorageService.retrieve('isLoggedIn');
  }
  getLoggedInUserNameObservable(): Observable<any> {
    return this.localStorageService.observe('loggedInUserName');
  }
  getLoggedInUserInfo(): User {
    const userData: User = new User();
    userData.name = this.localStorageService.retrieve('loggedInUserName');
    userData['email-id'] = this.localStorageService.retrieve('loggedInMailid');
    return userData;
  }
  private saveUserDetailsToLocalStorage(userInfo: User): void {
    this.localStorageService.store('isLoggedIn', 'true');
    this.localStorageService.store('loggedInUserName', userInfo.name);
    this.localStorageService.store('loggedInMailid', userInfo['email-id']);
  }
  private removeUserDetailsFromLocalStorage(): void {
    this.localStorageService.clear('isLoggedIn');
    this.localStorageService.clear('loggedInUserName');
    this.localStorageService.clear('loggedInMailid');
  }
}
