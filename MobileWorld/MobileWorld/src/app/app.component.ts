import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarAdsService } from './services/car-ads-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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