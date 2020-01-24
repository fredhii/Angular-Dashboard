import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';

// Temporal
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Modules
import { ShareModule } from './share/share.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Services
import { ServiceModule } from './services/service.module';
import { PagesComponent } from './pages/pages.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    ShareModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
