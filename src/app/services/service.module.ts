import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  LoginGuard,
  AdminGuard,
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  UploadFileService,
  HospitalService,
  DoctorService,
  CheckTokenGuard
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuard,
    AdminGuard,
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    DoctorService,
    CheckTokenGuard
  ]
})
export class ServiceModule { }
