import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { GoogleMapAngularComponent } from './components/google-map-angular/google-map-angular.component';
import { UserHomeComponent } from './components/user-home/user-home.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path:'signUp', component: SignupComponent},
  {path:'googlemaps', component: GoogleMapAngularComponent},
  {path:'userhome', component: UserHomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
