import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { AdShortDetailsComponent } from '../ad-short-details/ad-short-details.component';
import { AdShortDetailsModel } from '../models/ad-short-details-model';
import { CarAdsService } from '../services/car-ads-service';
import { SearchFilterModel } from '../models/search-filter-model';

@Component({
  selector: 'home',
  imports: [FilterComponent, AdShortDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone : true
})
export class HomeComponent {

  private _latestAds! : AdShortDetailsModel[];

  constructor(private _carAdsService : CarAdsService) {
    this.loadData();
  }

  async loadData(){

    this._latestAds = [...await this._carAdsService.loadLatetAds()];

  }

  getLatestAds() : AdShortDetailsModel[]{
    return this._latestAds;
  }

  async onSearchButtonClick(searchFilterModel : SearchFilterModel){

    this._latestAds = [...await this._carAdsService.loadBySearchCriteria(searchFilterModel)]

  }

  hasAds() : boolean{
    return this._latestAds.length > 0;
  }

}