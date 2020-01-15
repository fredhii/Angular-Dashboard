import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  rememberme: boolean = false;

  auth2: any;

  constructor( 
    public router: Router,
    public _userService: UserService
    
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    // Show email if saved in localStorage ( remember )
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.rememberme = true;
    }

  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        cliend_id: '740627528981-41fuitq1ftcqe2n5has3uejo027qveqg.apps.googleusercontent.com',
        cookieólicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }

  attachSignin( element ){
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._userService.loginGoogle(token)
      .subscribe( () => window.location.href = "#/dashboard" );
    });
  }

  login( form: NgForm) {

    if (form.invalid ) {
      return;
    }
    let user = new User(null,form.value.email, form.value.password);

    this._userService.login(  user, form.value.rememberme)
    .subscribe( ok => this.router.navigate(['/dashboard']));
  }

}
