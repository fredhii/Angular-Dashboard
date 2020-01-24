import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean> | boolean {
    console.log('Token Guard');
    const token = this.userService.token;
    const payload = JSON.parse(atob( token.split('.')[1] ));
    const expired = this.expired( payload.exp);

    if ( expired ) {
      this.router.navigate(['/login']);
      return false;
    }


    return this.verifyRenew( payload.exp );
  }
  // =============================
  // Check token expiration
  // =============================
  verifyRenew( expDate: number ): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date( expDate * 1000 );
      const now = new Date();

      now.setTime( now.getTime() + ( 2 * 60 * 60 * 1000) );
      // console.log(tokenExp);
      // console.log(now);
      if ( tokenExp.getTime() < now.getTime() ) {
        resolve(true);
      } else {
        this.userService.renewToken()
                        .subscribe( () => {
                          resolve(true);
                        }, () => {
                          reject(false);
                          this.router.navigate(['/login']);
                        });
      }
    });
  }

  // =============================
  // Token expiration
  // =============================
  expired( expDate: number ) {
    const now = new Date().getTime() / 1000;

    if ( expDate < now) {
      return true;
    } else {
      return false;
    }
  }
}
