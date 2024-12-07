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
    Forum = 'forum',
    CreateAd = 'create-ad',
    EditAd = 'edit-ad',
    MyAds = 'my-ads'
}
export const routes: Routes = [
    {path : '', redirectTo: '/home', pathMatch: 'full'}, 
    {path: RoutePaths.Home, component : HomeComponent, title:'Начало'},
    {path: RoutePaths.Registration, component : RegistrationComponent, title:'Регистрация'},
    {path: RoutePaths.Login, component : LoginComponent, title:'Вход'},
    {path: RoutePaths.Ads, component : AdsComponent, title:'Всички бяви'},
    {path: RoutePaths.Forum, component : ForumComponent},
    {path: RoutePaths.CreateAd, component : AdFullDetailsComponent, title:'Създаване на обява'},
    {path: RoutePaths.EditAd, component : AdFullDetailsComponent, title:'Редакция на обява'},
    {path: RoutePaths.MyAds, component : AdsComponent, title:'Моите обяви'},
];
