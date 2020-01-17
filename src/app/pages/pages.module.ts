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
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { DoughnutComponent } from '../components/doughnut/doughnut.component';
import { IncreaserComponent } from '../components/progress/increaser.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';



@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graphic1Component,
        PagesComponent,
        IncreaserComponent,
        DoughnutComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        ModalUploadComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graphic1Component,
        PagesComponent
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