import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForumComponent } from './forum/forum.component';
import { AdFullDetailsComponent } from './ad-full-details/ad-full-details.component';
import { AdsComponent } from './ads/ads.component';

export enum RoutePaths{
    Home = 'home',
    Registration = 'registration',
    Login = 'login',
    Ads = 'ads',
    AdDetails = "ad/details/:id",
    Forum = 'forum',
    AdCreate = 'ad/create',
    MyAds = 'my-ads'
}
export const routes: Routes = [
    {path : '', redirectTo: '/home', pathMatch: 'full'}, 
    {path: RoutePaths.Home, component : HomeComponent, title:'Начало'},
    {path: RoutePaths.Registration, component : RegistrationComponent, title:'Регистрация'},
    {path: RoutePaths.Login, component : LoginComponent, title:'Вход'},
    {path: RoutePaths.Ads, component : AdsComponent, title:'Всички бяви'},
    {path: RoutePaths.Forum, component : ForumComponent},
    {path: RoutePaths.AdCreate, component : AdFullDetailsComponent, title:'Създаване на обява'},
    {path: RoutePaths.MyAds, component : AdsComponent, title:'Моите обяви'},
    {path: RoutePaths.AdDetails, component : AdFullDetailsComponent, title:'Преглед на обява'},
];
