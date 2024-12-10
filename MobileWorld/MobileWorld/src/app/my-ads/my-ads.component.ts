import { Component, OnInit } from '@angular/core';
import { AdShortDetailsModel } from '../models/ad-short-details-model';
import { CarAdsService, CarsRequiredDataExpansion } from '../services/car-ads-service';
import { Router, RouterModule } from '@angular/router';
import { AdShortDetailsComponent } from '../ad-short-details/ad-short-details.component';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-my-ads',
  imports: [AdShortDetailsComponent, RouterModule,],
  templateUrl: './my-ads.component.html',
  styleUrl: './my-ads.component.css',
  standalone : true
})
export class MyAdsComponent implements OnInit {
  
  private _ads : AdShortDetailsModel[] = new Array();

  constructor(private carAdsService : CarAdsService
    , private _userService : UserService) {
  }
  
  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){
    this._ads.push(... await this.carAdsService
        .loadCustomerAds(this._userService.getCustomerID())
      );
  }
  
  getAds() : AdShortDetailsModel[]{
    return this._ads;
  }

}
