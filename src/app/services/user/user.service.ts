import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import swal from 'sweetalert';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
  ) {
    this.loadStorage();
   }

  // ================================================
  // Check if logged In
  // ================================================
  alreadyLogedin() {
    return(this.token.length > 5) ? true : false;
  }
  // ================================================
  // Load storage
  // ================================================
  loadStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }
  // ================================================
  // Save data in local storage
  // ================================================
  saveStorage( id: string, token: string, user: User, menu: any ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.user = user;
    this.token = token;
    this.menu = menu;
  }
  // ================================================
  // LogOut
  // ================================================
  logOut() {
    this.user = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }
  // ================================================
  // Login With Google
  // ================================================
  loginGoogle( token ) {

    let url = URL_SERVICES + '/login/google';

    return this.http.post( url, {token} )
    .pipe(map(( response: any ) => {
      this.saveStorage(response.id, response.token, response.user, response.menu);
      return true;
    }));

  }
  // ================================================
  // Login
  // ================================================
  login( user: User, rememberme: boolean = false ) {

    if (rememberme) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';
    return this.http.post( url, user )
    .pipe(map( ( response: any ) => {
      this.saveStorage(response.id, response.token, response.user, response.menu);
      return true;
    }))
    .pipe(catchError( err => {
      swal('Error', 'Invalid Credentials', 'error');
      return throwError(err);
    }));
  }
  // ================================================
  // Register
  // ================================================
  createUser( user: User ) {

    let url = URL_SERVICES + '/user';

    return this.http.post( url, user )
                    .pipe(map( (response: any) => {

                      swal('User Created', user.email, 'success');
                      return response.user;

                    }))
                    .pipe(catchError( err => {
                      swal('Error', err.error.message , 'error');
                      return throwError(err);
                    }));
  }
  // ================================================
  // Profile
  // ================================================
  updateUser( user: User) {
    let url = URL_SERVICES + '/user/' + user._id;
    url += '?token=' + this.token;

    return this.http.put(url, user)
                    .pipe(map( ( response: any ) => {
                      if ( user._id === this.user._id ) {
                        let userBD: User = response.user;
                        this.saveStorage( userBD._id, this.token, userBD, this.menu );
                      }
                      swal('Success', 'User Updated', 'success' );
                      return true;
                    }))
                    .pipe(catchError( err => {
                      swal('Error', err.error.message, 'error');
                      return throwError(err);
                    }));
  }
  // ================================================
  // Update Image
  // ================================================
  changeImage( file: File, id: string ) {

    this._uploadFileService.uploadFile( file, 'user', id )
        .then( ( response: any ) => {
          // console.log(response);
          this.user.image = response.user.image;
          swal('Success', 'Image Updated', 'success');
          this.saveStorage( id, this.token, this.user, this.menu );
        })
        .catch( response =>{
          console.log(response);
        });

  }
  // ================================================
  // User
  // ================================================
  loadUsers( from: number = 0 ) {
    let url = URL_SERVICES + '/user?from=' + from;
    return this.http.get( url );
  }

  searchUsers( term: string ) {
    let url = URL_SERVICES + '/search/collection/user/' + term;
    return this.http.get( url )
                    .pipe(map((response: any) => response.user));
  }

  eraseUser( id: string ) {
    let url = URL_SERVICES + '/user/' + id;
    url += '?token=' + this.token;
    return this.http.delete( url )
                    .pipe(map( response => {
                      swal('Success', 'User was deleted', 'success');
                      return true;
                    }));
  }

}
