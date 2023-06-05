import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../../_helpers/storage';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class SessionManagerService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {}

  public getToken(): any {
    return this.storage.getItem('token');
  }

  public setToken(token: string): void {
    this.storage.setItem('token', token);
  }

  public setFullName(fullname: string): void {
    this.storage.setItem('fullname', fullname);
  }

  public getFullName(): any {
    return this.storage.getItem('fullname');
  }

  public setUserName(username: string): void {
    this.storage.setItem('username', username);
  }

  public getUserName(): any {
    return this.storage.getItem('username');
  }

  public get isloggedIn(): boolean {
    let token = this.getToken();
    if (token !== null) {
      const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(token);
      console.log('Decoded Token : ' + JSON.stringify(decodedToken));
      // this.setFullName(decodedToken.User_fullname);
      // this.setUserName(decodedToken.sub);
      const expirationDate = helper.getTokenExpirationDate(token);
      const isExpired = helper.isTokenExpired(token);
      if (!isExpired) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public getUserInfo() {
    let token = this.storage.getItem('token') || '';
    return atob(token.split('.')[1]);
  }
  public setUserInfo(user: any) {
    let userObject = JSON.parse(user);
    console.log('user.group', userObject.groups);

    this.storage.setItem('user', userObject?.groups[0]);
  }
}
