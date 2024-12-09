import { Component, OnInit } from '@angular/core';
import { AdShortDetailsComponent } from '../ad-short-details/ad-short-details.component';
import { Router, RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { CarAdsService, CarsRequiredDataExpansion } from '../services/car-ads-service';
import { AdShortDetailsModel } from '../models/ad-short-details-model';

@Component({
  selector: 'app-ads',
  imports: [AdShortDetailsComponent, RouterModule, FilterComponent],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css',
  standalone : true
})
export class AdsComponent implements OnInit {

  public ads : AdShortDetailsModel[] = new Array();

  constructor(private carAdsService : CarAdsService
    , private _router: Router) {
  }

  ngOnInit(): void {
    
    this.loadData();
  }

  async loadData(){

    await this.carAdsService.loadAds(CarsRequiredDataExpansion.FullData)
      .then(data=>{
        data.forEach(item =>{
          this.ads.push(item)
        })
      });

  }
}
