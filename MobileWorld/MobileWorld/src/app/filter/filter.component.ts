import { Component } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DropDownModel } from '../models/drop-down-model';

@Component({
  selector: 'app-filter',
  imports: [ DropDownComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  standalone : true
})
export class FilterComponent {

  public carBrandItems : DropDownModel[] = [];
  public carBrandModelsItems : DropDownModel[] = [];
  
  constructor() {
    
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
