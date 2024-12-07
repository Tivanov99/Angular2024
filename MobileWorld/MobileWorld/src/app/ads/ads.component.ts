import { Component } from '@angular/core';
import { AdModel } from '../models/ad-model';
import { AdShortDetailsComponent } from '../ad-short-details/ad-short-details.component';
import { RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { CarAdsService } from '../services/car-ads-service';

@Component({
  selector: 'app-ads',
  imports: [AdShortDetailsComponent, RouterModule, FilterComponent],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css',
  standalone : true
})
export class AdsComponent {

  public ads : AdModel[] = new Array();

  constructor(private carAdsService : CarAdsService) {
    this.getAds();
  }

  getAds(){

    // this.carAdsService.getCarsAds();
    
    let firstAdModel : AdModel = new AdModel();
    firstAdModel.header = 'Ауди RS6';
    firstAdModel.price = '99.999';
    firstAdModel.engineCbs = '3998';
    firstAdModel.distance = '79.000KM'
    firstAdModel.year = '2018';
    firstAdModel.fuelType = 'бензин';
    firstAdModel.gearType = 'Автоматична'
    firstAdModel.coupeType =  'ФастБек';
    firstAdModel.region = 'Бургас';
    firstAdModel.dateCreated = '08.12.2024'

    this.ads.push(firstAdModel);

    let secondAdModel : AdModel = new AdModel();
    secondAdModel.header = 'BMW M5';
    secondAdModel.price = '19.999';
    secondAdModel.engineCbs = '4998';
    secondAdModel.distance = '19.000KM'
    secondAdModel.year = '2009';
    secondAdModel.fuelType = 'бензин';
    secondAdModel.gearType = 'Автоматична'
    secondAdModel.coupeType =  'Седан';
    secondAdModel.region = 'Варна';
    secondAdModel.dateCreated = '08.11.2024'

    this.ads.push(secondAdModel);
  }
}
