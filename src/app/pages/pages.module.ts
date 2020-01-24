// ================================================================
// Imports
// ================================================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Pages Routes
import { PagesRouting } from './pages.routes';
// Forms
import {FormsModule} from '@angular/forms';
// Modules
import { ShareModule } from '../share/share.module';
import { PipesModule } from '../pipes/pipes.module';
// ng2-charts
import { ChartsModule } from 'ng2-charts';
// Others
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { DoughnutComponent } from '../components/doughnut/doughnut.component';
import { IncreaserComponent } from '../components/progress/increaser.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';



@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graphic1Component,
        IncreaserComponent,
        DoughnutComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        HospitalComponent,
        DoctorsComponent,
        DoctorComponent,
        SearchComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graphic1Component
        ],
    imports: [
        CommonModule,
        ShareModule,
        PagesRouting,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})

export class PagesModule { }