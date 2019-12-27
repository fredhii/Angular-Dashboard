import { NgModule } from '@angular/core';
//Pages Routes
import { PagesRouting } from './pages.routes';

import {FormsModule} from '@angular/forms'

// ng2-charts
import { ChartsModule } from 'ng2-charts';
import { DoughnutComponent } from '../components/doughnut/doughnut.component'

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
        IncreaserComponent,
        DoughnutComponent
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
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }