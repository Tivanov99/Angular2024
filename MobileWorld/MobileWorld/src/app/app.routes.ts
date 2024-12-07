import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path : '', redirectTo: '/home', pathMatch: 'full'}, 
    {path: 'home', component : HomeComponent},
    {path: 'registration', component : RegistrationFormComponent}
];
