import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public _userService: UserService
  ) {}

  canActivate() {

    if ( this._userService.user.role === 'Admin' ) {
      return true;
    } else {
      console.log('Block by Admin Guard!!!!!!!');
      this._userService.logOut();
      return false;
    }

  }

}
