import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;

  imageUpload: File;
  imageTemp: string | ArrayBuffer;

  constructor(
    public _userService: UserService
  ) {
    this.user = this._userService.user;
   }

  ngOnInit() {
  }

  saved( user: User ) {

    this.user.name = user.name;
    if ( !this.user.google ) {
      this.user.email = user.email;
    }

    this._userService.updateUser(this.user)
                    .subscribe();

  }

  selectImage( file: File ) {

    if ( !file ) {
      this.imageUpload = null;
      return;
    }

    // Check if file is image
    if ( file.type.indexOf('image') < 0 ) {
      swal('Inconrrect', 'Please select an image', 'warning');
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL( file );

    reader.onloadend = () => this.imageTemp = reader.result;

  }

  changeImage() {

    this._userService.changeImage( this.imageUpload, this.user._id );

  }

}
