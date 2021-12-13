

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './Services/auth.service';
import { AuthGuardService as AuthGuard} from './Services/auth-guard.service';

const appRoutes: Routes = [
        {path:'login',component:LoginComponent},
        {path:'signup',component:SignupComponent},
        {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
        {path:'', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
