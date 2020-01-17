import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
  ) {
    this.loadStorage();
   }


  alreadyLogedin(){
    return(this.token.length > 5) ? true : false;
  }

  loadStorage(){
    if( localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  // Save data in local storage
  saveStorage( id: string, token: string, user: User ) {
  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  this.user = user;
  this.token = token;
  }

  logOut(){
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }


  // Login With Google
  loginGoogle( token ) {

    let url = URL_SERVICES + '/login/google';

    return this.http.post( url, {token} )
    .pipe(map(( response:any ) => {
      this.saveStorage(response.id, response.token, response.user);
      return true;
    }));

  }

  // Login
  login( user: User, rememberme: boolean = false ){

    if (rememberme){
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';
    return this.http.post( url, user )
    .pipe(map( ( response: any ) =>{
      this.saveStorage(response.id, response.token, response.user);
      return true;
    }))
  }

  // Register
  createUser( user: User ) {

    let url = URL_SERVICES + '/user';

    return this.http.post( url, user )
                    .pipe(map( (response: any) => {

                      swal('User Created', user.email, 'success');
                      return response.user;

                    }));


  }

  // Profile
  updateUser( user: User) {
    let url = URL_SERVICES + '/user/' + user._id;
    url += '?token=' + this.token;

    return this.http.put(url, user)
                    .pipe(map( ( response: any ) => {

                      let userBD: User = response.user;
                      this.saveStorage( userBD._id, this.token, userBD );
                      swal('Success', 'User Updated', 'success' );

                      return true;

                    }));
  }

  changeImage( file: File, id: string ) {

    this._uploadFileService.uploadFile( file, 'user', id )
        .then( ( response: any ) =>{
          // console.log(response);
          this.user.image = response.user.image;
          swal('Success', 'Image Updated', 'success');
          this.saveStorage( id, this.token, this.user );
        })
        .catch( response =>{
          console.log(response);
        });

  }
}
