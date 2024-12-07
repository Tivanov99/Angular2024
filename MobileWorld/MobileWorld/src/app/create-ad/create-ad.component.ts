import { Component } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DropDownContextData } from '../context-data-objects/drop-down-context-data';
import { DropDownModel } from '../models/drop-down-model';

@Component({
  selector: 'app-create-ad',
  imports: [DropDownComponent],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css',
  standalone : true
})
export class CreateAdComponent {

  public pageModel = new PageModel();

  constructor() {
    this.loadData();
  }

  loadData(){
    this.pageModel.loadData();
  }

  onCreateButtonClick(){
    console.log("da");
  }
  
}

class PageModel {
  public carModelsContextData: DropDownContextData = new DropDownContextData();
  public carBrandContextData: DropDownContextData = new DropDownContextData();

  loadData(): void {

    this.carBrandContextData.setDropDownTitle('Марка')
    this.carBrandContextData.setInputData (this.loadCarBrand());

    this.carModelsContextData.setDropDownTitle('Модел')
    this.carModelsContextData.setInputData (this.loadCarModels());
    this.carModelsContextData.setUseCheckBoxesFlag(true);

  }

  loadCarBrand() : DropDownModel []{
    return [
      {
        name : "BMW",
        itemID : "1"
      },
      {
        name : "Аudi",
        itemID : "2"
      }
    ]
  }

  loadCarModels() : DropDownModel [] {
    return [
      {
        name : "A7",
        itemID : "3"
      },
      {
        name : "RS7",
        itemID : "4"
      }
    ];
  }
  
}