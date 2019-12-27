import { NgModule } from '@angular/core';
//Pages Routes
import { PagesRouting } from './pages.routes';

import {FormsModule} from '@angular/forms'

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';

import { IncreaserComponent } from '../components/progress/increaser.component';

//Share Module
import { ShareModule } from '../share/share.module';
import { from } from 'rxjs';



@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graphic1Component,
        PagesComponent,
        IncreaserComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graphic1Component,
        PagesComponent
    ],
    imports: [
        ShareModule,
        PagesRouting,
        FormsModule
    ]
})

export class PagesModule { }