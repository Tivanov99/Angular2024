import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { AdComponent } from '../ad/ad.component';
import { AdModel } from '../models/ad-model';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'home',
  imports: [FilterComponent, AdComponent, CounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone : true
})
export class HomeComponent {

  public latestAds : AdModel[] = new Array();

  constructor() {
    this.getLatestAds();
  }

  // filterSearchButton(searchFilterModel : SearchFilterModel){

  //   console.log('search emit from patent')
  //   console.log(searchFilterModel);

  // }

  getLatestAds(){
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

    this.latestAds.push(firstAdModel);

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

    this.latestAds.push(secondAdModel);
  }

}