import { Component } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { DropDownComponent } from '../../drop-down/drop-down.component';
import { DropDownModel } from '../models/drop-down-model';

@Component({
  selector: 'app-home-page',
  imports: [ BasePageComponent, DropDownComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone : true
})
export class HomePageComponent  extends BasePageComponent{

  public carBrandItems : DropDownModel[] = [];
  public carBrandModelsItems : DropDownModel[] = [];
  
  constructor() {
    super();

    this.loadCarBrand();
    this.loadCarModels();
  }

  loadCarBrand(){

    this.carBrandItems.push({
      name : "BMW",
      itemID : 1
    },
    {
      name : "Аudi",
      itemID : 2
    })

  }

  loadCarModels(){
    this.carBrandModelsItems.push({
      name : "A7",
      itemID : 3
    },
    {
      name : "RS7",
      itemID : 4
    })
  }

  loadFuelTypes(){
    
  }

  loadTransmissionTypes(){
    
  }


}