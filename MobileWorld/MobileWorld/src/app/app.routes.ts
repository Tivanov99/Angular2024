import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path : '', redirectTo: '/home', pathMatch: 'full'}, 
    {path: 'home', component : HomeComponent},
    {path: 'registration', component : RegistrationComponent},
    {path: 'login', component : LoginComponent},
];
