import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;

  totalRegister: number = 0;
  loading: boolean = true;

  constructor(
    public _userService: UserService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadUsers();

    this._modalUploadService.notification
          .subscribe( response => this.loadUsers() );
  }

  showModal( id: string ) {
    this._modalUploadService.showModal( 'user', id );
  }
  // =============================================
  // GET users
  // =============================================
  loadUsers() {

    this.loading = true;

    this._userService.loadUsers( this.from )
                    .subscribe( (response: any) => {
                      // console.log(response);
                      this.totalRegister = response.total;
                      this.users = response.users;
                      this.loading = false;
                    });

  }
  // =============================================
  // Paguination
  // =============================================
  changeFrom( value: number ) {
    const from = this.from + value;
    if ( from >= this.totalRegister ) {
      return;
    }
    if ( from < 0 ) {
      return;
    }
    this.from += value;
    this.loadUsers();
  }
  // =============================================
  // Search bar
  // =============================================
  searchUser( term: string ) {
              if ( term.length <= 0 ) {
                this.loadUsers();
                return;
              }
              this.loading = true;
              this._userService.searchUsers( term )
                              .subscribe( (users: User[]) => {
                                this.users = users;
                                this.loading = false;
                                });
  }
  // =============================================
  // Erase User
  // =============================================
  eraseUser( user: User ) {
              if ( user._id === this._userService.user._id ) {
                swal('Incorrect', 'You cannot delete yourself', 'error');
                return;
              }
              swal({
                title: 'Are you sure?',
                text: 'Once deleted, you will not be able to recover ' + user.name,
                icon: 'warning',
                buttons: true,
                dangerMode: true,
              })
              .then(willDelete => {
                      if (willDelete) {
                        this._userService.eraseUser( user._id )
                                        .subscribe( response => {
                                          console.log( response );
                                          this.loadUsers();
                                          this.changeFrom(-5);
                                        });
                        }
              });
  }

  // Save User Info from Maintenance
  saveUser( user: User ) {
    this._userService.updateUser( user )
                      .subscribe();
  }

}
