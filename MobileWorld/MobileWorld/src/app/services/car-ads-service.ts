import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CarAdsService {

  constructor(private http: HttpClient) {
  }

  getCarAds() : void{
    this.http.get('https://mobileworld-18285-default-rtdb.firebaseio.com/car_ads.json')
      .subscribe((res) => {console.log(res)});
  }
}
