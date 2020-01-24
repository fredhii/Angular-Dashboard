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
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { CheckTokenGuard } from '../services/guards/check-token.guard';



const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [CheckTokenGuard] , data: { title: 'Dashboard' } },
    { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
    { path: 'graphic1', component: Graphic1Component, data: { title: 'Doughnut Graphics' }},
    { path: 'promesas', component: PromesasComponent, data: { title: 'Promises' }},
    { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Theme Settings' }},
    { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' }},
    { path: 'profile', component: ProfileComponent, canActivate: [CheckTokenGuard], data: { title: 'My Profile' }},
    { path: 'search/:term', component: SearchComponent, data: { title: 'Search' }},
    // Maintenance
    { path: 'user', component: UsersComponent, canActivate: [ AdminGuard, CheckTokenGuard ], data: { title: 'User Maintenance' }},
    { path: 'hospital', component: HospitalComponent, canActivate: [CheckTokenGuard], data: { title: 'Hospital Maintenance' }},
    { path: 'doctor', component: DoctorsComponent, canActivate: [CheckTokenGuard], data: { title: 'Doctors Maintenance' }},
    { path: 'doctor/:id', component: DoctorComponent, canActivate: [CheckTokenGuard], data: { title: 'Update Doctor' }},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRouting { }
