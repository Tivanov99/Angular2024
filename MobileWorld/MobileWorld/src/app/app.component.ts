import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from './services/firebase-post.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone : true
})
export class AppComponent  implements OnInit
  {

  carAds : any [] = [];

  constructor(private http: ConfigService)
  {}
  
  ngOnInit(): void {
    
    this.http.getCarAds();
  }


  title = 'MobileWorld';

}