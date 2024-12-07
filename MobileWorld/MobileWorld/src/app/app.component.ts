import { Component, OnInit } from '@angular/core';
import { CarAdsService } from './services/car-ads-service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'my-app',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone : true
})
export class AppComponent  implements OnInit{

  carAds : any [] = [];

  constructor(private http: CarAdsService)
  {}
  
  ngOnInit(): void {
    
    this.http.getCarsAds();
  }

  title = 'MobileWorld';

}