import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './services/guards/login.guard';
import { NopagefoundComponent } from './share/nopagefound/nopagefound.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '',
    component: PagesComponent,
    canActivate: [ LoginGuard ],
    loadChildren: './pages/pages.module#PagesModule'
  },
  // 404 page
  { path: '**', component: NopagefoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }