import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { NopagefoundComponent } from '../share/nopagefound/nopagefound.component';
import { UsersComponent } from './users/users.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';



const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
      { path: 'graphic1', component: Graphic1Component, data: { title: 'Doughnut Graphics' }},
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promises' }},
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Theme Settings' }},
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' }},
      { path: 'profile', component: ProfileComponent, data: { title: 'My Profile' }},
      { path: 'search/:term', component: SearchComponent, data: { title: 'Search' }},

      // Maintenance
      { path: 'user', component: UsersComponent, canActivate: [ AdminGuard ], data: { title: 'User Maintenance' }},
      { path: 'hospital', component: HospitalComponent, data: { title: 'Hospital Maintenance' }},
      { path: 'doctor', component: DoctorsComponent, data: { title: 'Doctors Maintenance' }},
      { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Update Doctor' }},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
  // 404 page
  { path: '**', component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRouting { }
