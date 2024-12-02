import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomePageComponent } from './app/home-page/home-page.component';

bootstrapApplication(HomePageComponent, appConfig)
  .catch((err) => console.error(err));
