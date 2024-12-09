import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { AdShortDetailsComponent } from '../ad-short-details/ad-short-details.component';
import { CounterComponent } from '../counter/counter.component';
import { AdShortDetailsModel } from '../models/ad-short-details-model';
import { CarAdsService, CarsRequiredDataExpansion } from '../services/car-ads-service';

@Component({
  selector: 'home',
  imports: [FilterComponent, AdShortDetailsComponent, CounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone : true
})
export class HomeComponent {

  private _latestAds : AdShortDetailsModel[] = new Array();

  constructor(private _carAdsService : CarAdsService) {
    this.loadData();
  }

  // filterSearchButton(searchFilterModel : SearchFilterModel){

  //   console.log('search emit from patent')
  //   console.log(searchFilterModel);

  // }

  async loadData(){

    await this._carAdsService.loadAds(CarsRequiredDataExpansion.LatestData).then((data=>{
      data.forEach(item =>{
        this._latestAds.push(item);
      })
    }));

  }

  getLatestAds() : AdShortDetailsModel[]{
    return this._latestAds;
  }

}