import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { AdComponent } from '../ad/ad.component';
import { AdModel } from '../models/ad-model';

@Component({
  selector: 'home',
  imports: [RouterModule, FilterComponent, AdComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone : true
})
export class HomeComponent {

  public latestAds : AdModel[] = new Array();

  constructor() {
    this.getLatestAds();
  }

  filterSearchButton(){
    console.log('search emit from patent')
  }

  getLatestAds(){
    let adModel : AdModel = new AdModel();
    adModel.header = 'Ауди RS6';
    adModel.price = '99.999';
    adModel.engineCbs = '3998';
    adModel.distance = '79.000KM'
    adModel.year = '2018';
    adModel.fuelType = 'бензин';
    adModel.gearType = 'Автоматична'
    adModel.coupeType =  'ФастБек';
    adModel.region = 'Бургас';
    adModel.dateCreated = '08.12.2024'

    this.latestAds.push(adModel);
  }

}