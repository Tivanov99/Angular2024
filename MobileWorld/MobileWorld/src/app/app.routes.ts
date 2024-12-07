import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdComponent } from './ad/ad.component';
import { ForumComponent } from './forum/forum.component';
import { CreateAdComponent } from './create-ad/create-ad.component';

export const routes: Routes = [
    {path : '', redirectTo: '/home', pathMatch: 'full'}, 
    {path: 'home', component : HomeComponent},
    {path: 'registration', component : RegistrationComponent},
    {path: 'login', component : LoginComponent},
    {path: 'ads', component : AdComponent},
    {path: 'forum', component : ForumComponent},
    {path: 'create-ad', component : CreateAdComponent},
];
