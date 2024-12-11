import { Component, OnInit } from '@angular/core';
import { AdShortDetailsComponent } from '../ad-short-details/ad-short-details.component';
import { Router, RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { CarAdsService, CarsRequiredDataExpansion } from '../services/car-ads-service';
import { AdShortDetailsModel } from '../models/ad-short-details-model';
import { SearchFilterModel } from '../models/search-filter-model';

@Component({
  selector: 'app-ads',
  imports: [AdShortDetailsComponent, RouterModule, FilterComponent],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css',
  standalone : true
})
export class AdsComponent implements OnInit {

  private _ads! : AdShortDetailsModel[];

  constructor(private _carAdsService : CarAdsService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){
    this._ads = [... await this._carAdsService.loadLatetAds()];
  }

  getAds() : AdShortDetailsModel[]{
    return this._ads;
  }

  async onSearchButtonClick(searchFilterModel : SearchFilterModel){

    this._ads = [...await this._carAdsService.loadBySearchCriteria(searchFilterModel)]

  }

  hasAds() : boolean{
    return this._ads.length > 0;
  }
}
