import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Database, ref, set, get, update, remove } from '@angular/fire/database'
import { from, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ConfigService {
  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }

  getCarAds() : void{
    this.http.get('https://mobileworld-18285-default-rtdb.firebaseio.com/car_ads.json')
    .subscribe((res) => {console.log(res)});
}
}
