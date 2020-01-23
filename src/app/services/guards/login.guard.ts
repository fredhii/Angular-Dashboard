import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    public _userService: UserService,
    public router: Router
    ) {}

  canActivate() {

    if ( this._userService.alreadyLogedin() ) {
      console.log('Pass through Guard');
      return true;
    } else {
      console.log('Block by Guard');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
